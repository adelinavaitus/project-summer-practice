package com.backend.document;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepository;

    // Fetches all documents from the database
    public List<Document> getAllDocuments(){
        List<Document> documents = documentRepository.findAll();

        return documents;
    }

    // Fetches a document by its ID
    public Document getDocumentById(int id){
        Document document = documentRepository.findById(id).get();

        return document;
    }

    // Inserts a new document into the database
    public Document insertDocument(Document document){
        Document newDocument = documentRepository.save(document);

        return newDocument;
    }

    // Updates an existing document based on the provided DTO (FormGetDocument)
    public Document updateDocument (FormGetDocument formGetDocument){
        Document document = getDocumentById(formGetDocument.getId());
        document.setDownloadUrl(formGetDocument.getDownloadUrl());
        document.setName(formGetDocument.getName());
        long millis=System.currentTimeMillis();
        java.sql.Date date=new java.sql.Date(millis);
        document.setDate(date);
        document.setStatus("PENDING");

        return documentRepository.save(document);
    }

    // Approves a document, updates final URL, supervisor name, and feedback
    public Document updateDocumentApproved (FormGetDocument formGetDocument){
        Document document = getDocumentById(formGetDocument.getId());
        document.setDownloadUrlFinal(formGetDocument.getDownloadUrlFinal());
        document.setNameDocSupervisor(formGetDocument.getNameDocSupervisor());
        document.setFeedback(formGetDocument.getFeedback());
        document.setStatus("APPROVED");

        return documentRepository.save(document);
    }

    // Rejects a document and updates its feedback
    public Document updateDocumentRejected (FormGetDocument formGetDocument){
        Document document = getDocumentById(formGetDocument.getId());
        document.setFeedback(formGetDocument.getFeedback());
        document.setStatus("REJECTED");

        return documentRepository.save(document);
    }

    // Deletes a document from the database
    public  Document deleteDocument(Document document){
        Document oldDocument = document;
        documentRepository.delete(document);

        return oldDocument;
    }
}
// TODO: Create an enum for status values (e.g., PENDING, APPROVED, REJECTED)
// and replace the String type for the "status" field in the Document entity with the new enum.