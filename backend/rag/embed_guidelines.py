from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings

openai_key = os.getenv("OPENAI_API_KEY")

def embed_guidelines(pdf_path: str = "rag/2023-e-m-descriptors-guidelines.pdf", persist_dir: str = "rag/db"):
    print("Loading and chunking guidelines...")
    loader = PyPDFLoader(pdf_path)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = splitter.split_documents(docs)

    print(f"Chunked into {len(chunks)} segments. Embedding now...")

    vectorstore = Chroma.from_documents(
        chunks,
        embedding=OpenAIEmbeddings(openai_api_key=openai_key),
        persist_directory=persist_dir
    )
    vectorstore.persist()
    print("Embedding completed and saved to disk.")

if __name__ == "__main__":
    embed_guidelines()
