
FROM python:3.12

#working directory
WORKDIR /app

#copy requirements into working directory 
COPY requirements.txt .

#installing Dependencies
RUN pip install --no-cache-dir -r requirements.txt

#copy rest of the code
COPY . .

EXPOSE 8000


CMD ["uvicorn", "main:app","--reload", "--host", "0.0.0.0", "--port", "8080"]