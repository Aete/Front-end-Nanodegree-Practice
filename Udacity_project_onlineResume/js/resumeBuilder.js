var bio = {
    "name" : "Han Seung Gyun",
    "role" : "Designer",
    "contacts" : {
        "mobile": "+82-10-7126-8234",
        "email" : "hsg8234@naver.com",
        "github" : "Aete",
        "location" : "Busan"
    },
    "welcomeMessage" : "Hello!",
    "Skills" : ["AutoCad","Revit","html","CSS","JS","Photoshop","Illustrator"],
    "biopic" : "http://via.placeholder.com/200X210",
    "display" : function(){
        var formattedName = HTMLheaderName.replace("%data%", bio.name);
        var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
        var formattedCMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
        var formattedCEmail = HTMLemail.replace("%data%", bio.contacts.email);
        var formattedCGithub = HTMLgithub.replace("%data%", bio.contacts.github);
        var formattedWelmsg = HTMLwelcomeMsg.replace("%data%",bio.welcomeMessage);
        var formattedCLocation = HTMLlocation.replace("%data%", bio.contacts.location);
        var formattedpicture = HTMLbioPic.replace("%data%", bio.biopic);
        $("#header").prepend(formattedRole);
        $("#header").prepend(formattedName);
        $("#topContacts").append(formattedCMobile);
        $("#topContacts").append(formattedCEmail);
        $("#topContacts").append(formattedCGithub);
        $("#topContacts").append(formattedCLocation);
        $("#footerContacts").append(formattedCMobile);
        $("#footerContacts").append(formattedCEmail);
        $("#footerContacts").append(formattedCGithub);
        $("#footerContacts").append(formattedCLocation);
        $("#header").append(formattedpicture);
        $("#header").append(formattedWelmsg);
        $("#header").append(HTMLskillsStart);
        bio.Skills.forEach(function(entry){
            var formattedSkills = HTMLskills.replace("%data%", entry);
            $("#skills").append(formattedSkills);

        });
    }
};

var education={
    "schools" : [{
        "name" : "Sungkyunkwan University",
        "location" : "Suwon",
        "degree" : "BA",
        "majors" : "Architecture",
        "dates" : "2017-08-03"
    },
        {
            "name" : "Sungkyunkwan University",
            "location" : "Suwon",
            "degree" : "Master-ing",
            "majors" : "Convergence Engineering for Future City",
            "dates" : "not graduate yet"
        }
    ],
    "OnlineCourses" : [{
        "title" : "Front-end web developer",
        "school" : "Udacity",
        "dates" : "2017-08-03",
        "url" : "https://www.udacity.com/"
    }],
    "display" : function() {
        education.schools.forEach(function (entry) {
            $("#education").append(HTMLschoolStart);
            var schoolName = HTMLschoolName.replace('%data%', entry.name);
            var schoolDegree = HTMLschoolDegree.replace('%data%', entry.degree);
            var schoolLocation = HTMLschoolLocation.replace('%data%', entry.location);
            var schoolMajors = HTMLschoolMajor.replace('%data%', entry.majors);
            var schoolDates = HTMLschoolDates.replace('%data%', entry.dates);
            $(".education-entry:last").append(schoolName+schoolDegree);
            $(".education-entry:last").append(schoolLocation);
            $(".education-entry:last").append(schoolDates);
            $(".education-entry:last").append(schoolMajors);
            }
        );
        education.OnlineCourses.forEach(function(entry){
            $("#education").append(HTMLonlineClasses);
            $("#education").append(HTMLschoolStart);
            var onlineTitle = HTMLonlineTitle.replace('%data%',entry.title);
            var onlineSchool = HTMLonlineSchool.replace('%data%',entry.school);
            var onlineDates = HTMLonlineDates.replace('%data%',entry.dates);
            var onlineUrl = HTMLonlineURL.replace('%data%',entry.url);
            $(".education-entry:last").append(onlineTitle+onlineSchool);
            $(".education-entry:last").append(onlineDates);
            $(".education-entry:last").append(onlineUrl);
        });

    }
};

var work={
    "jobs":[{
        "employer" : "SKKU Smart Green City Lab",
        "title" : "Researcher",
        "location" : "Suwon",
        "dates" : "2017",
        "description" : "Researcher for Urban Design and Smart City"
    }],
    "display": function(){
        work.jobs.forEach(function(entry){
            $("#workExperience").append(HTMLworkStart);
            var workEmployer = HTMLworkEmployer.replace("%data%",entry.employer);
            var workTitle = HTMLworkTitle.replace("%data%",entry.title);
            var workLocation = HTMLworkLocation.replace("%data%",entry.location);
            var workDates = HTMLworkDates.replace("%data%",entry.dates);
            var workDescription= HTMLworkDescription.replace("%data%",entry.description);
            $(".work-entry:last").append(workEmployer+workTitle);
            $(".work-entry:last").append(workLocation);
            $(".work-entry:last").append(workDates);
            $(".work-entry:last").append(workDescription);

        });
    }
};

var projects={
    "projects":[{
        "title" : "District Unit Design for Smart City",
        "dates" : "2016",
        "description" : "District Unit Design for Smart City",
        "image" : "http://via.placeholder.com/300x300"
    }],
    "display": function(){
        projects.projects.forEach(function(entry){
            $("#projects").append(HTMLprojectStart);
            var prjTitle = HTMLprojectTitle.replace("%data%",entry.title);
            var prjDates = HTMLprojectDates.replace("%data%",entry.dates);
            var prjDescription= HTMLprojectDescription.replace("%data%",entry.description);
            var prjImage= HTMLprojectImage.replace("%data",entry.image);
            $(".project-entry:last").append(prjTitle);
            $(".project-entry:last").append(prjDates);
            $(".project-entry:last").append(prjDescription);
            $(".project-entry:last").append(prjImage);

        });
    }
};
$("#mapDiv").append(googleMap);
bio.display();
education.display();
work.display();
projects.display();


