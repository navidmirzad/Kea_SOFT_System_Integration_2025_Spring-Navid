<div class="title-card">
    <h1>System Integration - Introduction</h1>
</div>

---

# What is Systems Integration

## **Zooming into the parts where systems integrate**

* How to make systems communicate. 

* Considering different architectures, services, technologies and protocols.

* Understanding the pros and cons of each approach.

* Working together and documenting systems because how else can others integrate with those systems?


---

# About the course

## This week

[About the course](https://github.com/anderslatif/Kea_SOFT_System_Integration_2025_Spring/00._Meta_Course_Material/about_the_course.md)

## Next week

About the exam

Introduction to tooling (be present for this)


---

# What this course is not DLS

## Developing large systems or fleshing out systems

Each week we will create many code examples that exemplify one specific type of integration.

---

# More things that this course is not

* This is not a security course. Considering security when setting up systems is crucial but it's just not this course, unfortunately. 

* This is not a CI/CD course. That belongs to Development of Large Systems.

* This is not a course where we will talk about orchestration tools such as Kubernetes. That also belongs to DLS. 

* This is not a Docker course. Putting applications in containers has no relevance for how they integrate with outside services. 

---

# Cases where you would integrate systems as a business

*What does it means to integrate?*

*Where are these systems?* 

*Who is integrating them?* 

*Who is exposing them?*

---

# Business-to-Business (B2B) integration

* **Third-party System Integration** You want to integrate with a system that isn't yours.

* **Software-as-a-Service Integration (SaaS)**: You need to connect your system with SaaS platforms like Salesforce, Slack, or HubSpot.

* **Enterprise Application Integration (EAI)** You want separate services within your business environment.

---

# Legacy Integrations

* SOAP

* RMI / RPC

    - Exception: https://grpc.io/ (RPC is gaining is back in a new form)

* IRC

* RSS

---

<div class="exercise-card" style="color: green;">
    <h1>Exercise - Get Google Home</h1>
</div>

Write code that gets the Google homepage as a HTML file (index.html) locally on your computer. 

You have 3 minutes!

---

<div class="exercise-card" style="color: green;">
    <h1>Exercise - Get Google Home - Possible Solution</h1>
</div>

One possible solution is cURL. 

```bash 
#!/bin/bash

curl https://www.google.com/ > index.html
```

*Why do you think I like this solution?*

---

<div class="exercise-card" style="color: green;">
    <h1>Exercise - Conclusion</h1>
</div>

Don’t choose a solution just because it is familiar. Make time for researching approaches. 

With AI tools, be careful about the way you prompt. Same with Search Engines.

This course aims to provide more tools in your tool box and give you a better understanding of the pros and cons of each tool.

---