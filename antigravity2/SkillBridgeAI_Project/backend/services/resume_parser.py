import PyPDF2
from io import BytesIO

def extract_text_from_pdf(pdf_file_obj) -> str:
    """
    Extracts text from a given PDF file object.
    """
    try:
        reader = PyPDF2.PdfReader(pdf_file_obj)
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n"
        return text
    except Exception as e:
        print(f"Error parsing PDF: {e}")
        return ""
