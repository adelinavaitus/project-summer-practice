package com.backend.company;

import com.backend.user.Forms.FormGetCompany;
import com.backend.user.User;
import com.backend.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private UserRepository userRepository;

    // Retrieve all companies from the database
    public List<Company> getAllCompanies(){
        List<Company> companyList = companyRepository.findAll();

        return companyList;
    }

    // Retrieve company details and convert them into FormGetCompany DTOs
    public List<FormGetCompany> getAllFormsGetCompanies(){
        List<FormGetCompany> formGetCompanies = new ArrayList<>();
        List<Company> companies = companyRepository.findAll();
        for(Company company : companies){
            User user = userRepository.getById(company.getId());
            FormGetCompany formGetCompany = new FormGetCompany();
            formGetCompany.setId(company.getId());
            formGetCompany.setEmail(user.getEmail());
            formGetCompany.setName(company.getName());
            formGetCompany.setSize(company.getSize());
            formGetCompany.setDescription(company.getDescription());
            formGetCompanies.add(formGetCompany);
        }

        return formGetCompanies;
    }

    // Get a company by its ID
    public Company getCompanyById(int id){
        Company company =  companyRepository.findById(id).get();

        return company;
    }

    // Insert a new company into the database
    public Company insertCompany (Company company){
        Company newCompany = companyRepository.save(company);

        return newCompany;
    }

    // Update the description of a company by its ID
    public Company updateCompanyNameById(int id, String name){
        Company company = getCompanyById(id);
        company.setName(name);

        return companyRepository.save(company);
    }

    // Update the description of a company by its ID
    public Company updateCompanyDescriptionById(int id, String description){
        Company company = getCompanyById(id);
        company.setDescription(description);

        return companyRepository.save(company);
    }

    // Update the size of a company by its ID
    public Company updateCompanySizeById(int id, String size){
        Company company = getCompanyById(id);
        company.setSize(size);

        return companyRepository.save(company);
    }

    // Update an existing company's details
    public Company updateCompany(Company company){
        Company updatedCompany = companyRepository.save(company);

        return updatedCompany;
    }

    // Delete a company from the database
   public Company deleteCompany (Company company){
        Company oldCompany = company;
        companyRepository.delete(company);

        return oldCompany;
   }
}
