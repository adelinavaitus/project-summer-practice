package com.backend.document;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepository;


    public List<Document> getAllDocuments(){
        List<Document> documents = documentRepository.findAll();
        return documents;
    }

    public Document getDocumentById(int id){
        Document document = documentRepository.findById(id).get();
        return document;
    }

    public Document insertDocument(Document document){
        Document newDocument = documentRepository.save(document);
        return newDocument;
    }

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

    public Document updateDocumentApproved (FormGetDocument formGetDocument){
        Document document = getDocumentById(formGetDocument.getId());
        document.setDownloadUrlFinal(formGetDocument.getDownloadUrlFinal());
        document.setNameDocSupervisor(formGetDocument.getNameDocSupervisor());
        document.setFeedback(formGetDocument.getFeedback());
        document.setStatus("APPROVED");
        return documentRepository.save(document);
    }

    public Document updateDocumentRejected (FormGetDocument formGetDocument){
        Document document = getDocumentById(formGetDocument.getId());
        document.setFeedback(formGetDocument.getFeedback());
        document.setStatus("REJECTED");
        return documentRepository.save(document);
    }

    public  Document deleteDocumeent(Document document){
        Document oldDocument = document;
        documentRepository.delete(document);
        return oldDocument;
    }

}
