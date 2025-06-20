import streamlit as st
from langchain_ollama import ChatOllama
import mysql.connector
import time
import webbrowser

# Initialize LLM
model = ChatOllama(model="llama3.1", temperature=0.8)

def llm(prompt: str) -> str:
    return model.predict(prompt)

# --- PAGE CONFIG ---
st.set_page_config(page_title="AI Interviewer", layout="centered")
st.title("🎤 AI Interviewer")

# --- READ QUERY PARAMS ---
query_params = st.experimental_get_query_params()
interview_id = query_params.get("interview_id", [None])[0]
candidate_email = query_params.get("candidate_email", [None])[0]
interview_title = query_params.get("interview_title", [""])[0]
job_description = query_params.get("job_description", [""])[0]

job_context = f"{interview_title} - {job_description}".strip()

# --- SESSION STATE ---
if "history" not in st.session_state:
    st.session_state.history = ""
    st.session_state.total_questions = 0
    st.session_state.started = False
    st.session_state.finished = False
    st.session_state.last_question = ""
    st.session_state.score = ""
    st.session_state.interviewer = job_context
    st.session_state.exit_requested = False
    st.session_state.confirm_exit = False

# --- AUTO-START INTERVIEW ---
if not st.session_state.started and job_context:
    st.session_state.started = True
    prompt = f"You're an interviewer. Interview a human for the role: {job_context}. Ask your first question."
    with st.spinner("Preparing your interview..."):
        question = llm(prompt).strip()
    st.session_state.last_question = question
    st.session_state.history += f"\n\n**Interviewer**: {question}"
    st.session_state.total_questions += 1

# --- EXIT BUTTON ---
with st.sidebar:
    st.markdown("### Exit Interview")
    if st.button("❌ End Interview"):
        st.session_state.exit_requested = True

# --- CONFIRM EXIT DIALOG ---
if st.session_state.exit_requested and not st.session_state.confirm_exit:
    st.warning("⚠️ Are you sure you want to end the interview early? Your submission will not be considered.")
    col1, col2 = st.columns(2)
    with col1:
        if st.button("Yes, End Now"):
            st.session_state.confirm_exit = True
            webbrowser.open("http://localhost:5173/candidate/CandidatesFinish")
    with col2:
        if st.button("No, Continue Interview"):
            st.session_state.exit_requested = False

# --- CHAT INTERACTION ---
if st.session_state.started and not st.session_state.finished and not st.session_state.exit_requested:
    st.markdown(st.session_state.history, unsafe_allow_html=True)
    user_input = st.text_input("Your answer:")
    if st.button("Submit Answer") and user_input:
        st.session_state.history += f"\n\n**Candidate**: {user_input}"

        if st.session_state.total_questions >= 5:
            with st.spinner("Evaluating your performance..."):
                prompt = (
                    "Evaluate the candidate's entire interview and give only a numerical score between 0 and 100.\n\n"
                    f"Interview:\n{st.session_state.history}"
                )
                score = llm(prompt).strip()
                st.session_state.score = score
                st.session_state.finished = True

                # --- SAVE TO DATABASE ---
                try:
                    conn = mysql.connector.connect(
                        host="localhost",
                        user="root",
                        password="sanjanauk@2004",
                        database="ai_based_interviewer_db"
                    )
                    cursor = conn.cursor()

                    insert_query = """
                        INSERT INTO candidate (candidate_email, interview_id, score, is_evaluated)
                        VALUES (%s, %s, %s, %s)
                    """
                    values = (candidate_email, interview_id, int(score), 0)
                    cursor.execute(insert_query, values)
                    conn.commit()

                    st.success("✅ Your score has been recorded.")
                    cursor.close()
                    conn.close()
                except Exception as e:
                    st.error("❌ Failed to save score to database.")
                    st.error(str(e))

                time.sleep(3)
                webbrowser.open("http://localhost:5173/candidate/CandidatesThankYou")

        else:
            prompt = (
                f"You're an interviewer. Continue interviewing for the role: {st.session_state.interviewer}.\n"
                f"Here’s the interview so far:\n{st.session_state.history}\nAsk your next question."
            )
            question = llm(prompt).strip()
            st.session_state.last_question = question
            st.session_state.history += f"\n\n**Interviewer**: {question}"
            st.session_state.total_questions += 1
