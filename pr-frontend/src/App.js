import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Register from './components/RegisterComponent';
import Home from './components/HomeComponent';
import ContactUs from './components/ContactUsComponent';
import NotFound from './components/NotFoundPageComponent';
import RegisterStudent from './components/RegisterStudentComponent';
import AboutUs from './components/AboutUsComponent';
import RegisterCompany from './components/RegisterCompanyComponent';
import Login from './components/LoginComponent';
import JobPage from './components/studentAccount/JobsComponent';
import JobDetails from './components/studentAccount/JobDetailsComponent';
import MyApplications from './components/studentAccount/MyApplicationsComponent';
import CVStudent from './components/studentAccount/CVStudentComponent';
import MyProfile from './components/studentAccount/MyProfileComponent';
import AddJobPage from './components/companyAccount/AddJobComponent';
import MyProfileCompany  from './components/companyAccount/MyProfileCompanyComponent';
import StudentDetails from './components/companyAccount/StudentDetailsComponent';
import AddFaculty from './adminAccount/AddFacultyComponent';
import Students from './adminAccount/StudentsComponent';
import Companies from './adminAccount/CompaniesComponent';
import Supervisors from './adminAccount/SupervisorsComponent';
import Info from './components/studentAccount/InfoComponent';
import UploadDoc from './components/studentAccount/UploadDocComponent';
import PendingRequest from './components/supervisorAccount/PendingRequestComponent';
import HistoryRequest from './components/supervisorAccount/HistoryRequestComponent';
import ProfileSupervisor from './components/supervisorAccount/ProfileSupervisorComponent';
class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <div className="App">
          <Switch>
            <Route exact path="/home"><Home /></Route>
            <Route path="/login" component={() => <Login />} />
            <Route exact path="/register"><Register /></Route>
            <Route exact path="/register/student"><RegisterStudent /></Route>
            <Route exact path="/register/company"><RegisterCompany /></Route>
            <Route exact path="/aboutus"><AboutUs /></Route>
            <Route exact path="/contactus"><ContactUs /></Route>
            <Route exact path="/jobs"><JobPage /></Route>
            <Route path="/jobs/:id" component={JobDetails}/> 
            <Route exact path="/myapplications" component={MyApplications} />
            <Route exact path="/addcv" component={CVStudent} />
            <Route exact path="/myprofile" component={MyProfile} />
            <Route exact path="/myprofilecompany" component={MyProfileCompany} />
            <Route exact path="/addjob" component={AddJobPage} />
            <Route exact path="/addfaculty" component={AddFaculty} />
            <Route exact path="/companies" component={Companies} />
            <Route exact path="/supervisors" component={Supervisors} />
            <Route exact path="/students" component={Students} />
            <Route path="/students/:id" component={StudentDetails}/> 
            <Route exact path="/notfound"><NotFound /></Route>
            <Route exact path="/info" component={Info} />
            <Route exact path="/uploaddoc" component={UploadDoc} />
            <Route exact path="/pendingreq" component={PendingRequest} />
            <Route exact path="/history" component={HistoryRequest} />
            <Route exact path="/profile-supervisor" component={ProfileSupervisor} />
            <Redirect to="/home" />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
