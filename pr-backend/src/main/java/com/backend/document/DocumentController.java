package com.backend.document;


import com.backend.faculty.Faculty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins ="*",maxAge = 3600)
@RequestMapping("/documents")
public class DocumentController {
    @Autowired
    private DocumentService documentService;

    // Endpoint to retrieve all documents
    @GetMapping()
    public ResponseEntity<List<Document>> getDocuments(){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(documentService.getAllDocuments());

        return responseEntity;
    }

    // Endpoint to retrieve a document by its ID
    @GetMapping("/{id}")
    public ResponseEntity<Document> getDocumentById(@PathVariable Integer id) {
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(documentService.getDocumentById(id));

        return responseEntity;
    }

    // Endpoint to insert a new document
    @PostMapping()
    public ResponseEntity<Document> insertDocument(@RequestBody Document document){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(documentService.insertDocument(document));

        return responseEntity;
    }

    // Endpoint to update an existing document
    @PutMapping()
    public ResponseEntity<Document> updateDocument(@RequestBody FormGetDocument formGetDocument){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(documentService.updateDocument(formGetDocument));

        return responseEntity;
    }

    // Endpoint to mark a document as approved
    @PutMapping("/approved")
    public ResponseEntity<Document> updateDocumentApproved(@RequestBody FormGetDocument formGetDocument){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(documentService.updateDocumentApproved(formGetDocument));

        return responseEntity;
    }

    // Endpoint to mark a document as rejected
    @PutMapping("/rejected")
    public ResponseEntity<Document> updateDocumentARejected(@RequestBody FormGetDocument formGetDocument){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(documentService.updateDocumentRejected(formGetDocument));

        return responseEntity;
    }

    // Endpoint to delete a document
    @DeleteMapping()
    public ResponseEntity<Document> deleteDocument(@RequestBody Document document){
        ResponseEntity responseEntity = ResponseEntity.status(HttpStatus.OK)
                .body(documentService.deleteDocument(document));

        return responseEntity;
    }
}
