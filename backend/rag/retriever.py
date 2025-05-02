from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

PERSIST_DIR = "rag/db"

def get_relevant_guidelines(query: str, api_key: str, k: int = 3) -> str:
    embedding = OpenAIEmbeddings(openai_api_key=api_key)
    vectorstore = Chroma(
        persist_directory=PERSIST_DIR,
        embedding_function=embedding
    )
    results = vectorstore.similarity_search(query, k=k)
    return "\n\n".join([doc.page_content for doc in results])

