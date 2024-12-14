
# DoItMorro Project Management Plan

---

## **Overview**
- **Purpose**: Define workflows, tools, and responsibilities for streamlined solo project management.
- **Goals**:
  1. Deliver a scalable, high-quality to-do management app for mobile and web.
  2. Use clear tools and workflows to manage tasks and track progress efficiently.

---

## **Tools and Platforms**

### **Task Management**
- **GitHub Issues**:
  - Central repository for tracking tasks, bugs, and enhancements.
  - Labels are used to categorize and prioritize tasks effectively.

### **Kanban Board**
- **GitHub Projects**:
  - A GitHub Projects board will be used to visually track the status of tasks.
  - Direct integration with GitHub Issues for seamless workflow management.

#### **Columns**:
1. **Backlog**:
   - Description: This item hasn’t been started yet.
   - Purpose: Holds tasks awaiting prioritization or readiness for work.
2. **Ready**:
   - Description: This task is ready to be picked up and moved to “In Progress.”
   - Purpose: Signals tasks that have been fully specified and are ready to be worked on.
3. **High Priority (MVP)**:
   - Description: Critical MVP tasks that need to be completed by the deadline.
   - Purpose: Highlights time-sensitive or mission-critical tasks.
4. **In Progress**:
   - Description: Tasks actively being worked on.
   - Purpose: Tracks ongoing development or implementation.
5. **Testing**:
   - Description: This task is being tested for functionality and completion.
   - Purpose: Ensures quality assurance before marking the task as complete.
6. **Blocked**:
   - Description: This task cannot progress due to dependencies or issues.
   - Purpose: Flags tasks that need resolution or external input to continue.
7. **Done**:
   - Description: This task has been completed.
   - Purpose: Serves as a record of completed work.

---

## **Time Tracking**
- **Clockify**:
  - Tracks time spent on individual tasks.
  - Categories: `Development`, `Planning`, `Testing`, etc.
  - Weekly time reports for self-accountability.

---

## **Documentation**
- **Markdown Files**:
  - Documentation will be created and stored in Markdown files directly in the project repository.
  - Includes:
    - Architecture plans.
    - Feature specifications.
    - Technical notes.
    - User stories.

---

## **Workflow**

### **Methodology**
- **Solo Agile Workflow**:
  - Use a simplified version of Agile Scrum principles.
  - Organize tasks into sprints with clear goals and deadlines.
  - Track progress using GitHub Issues and the GitHub Projects Kanban board.

### **Milestone Integration**
- The milestones defined in the **Project Plan** document will guide task priorities and deadlines.
- Tasks on the Kanban board will be tagged with the corresponding milestone for clarity and focus.

---

## **Automation with GitHub Actions**

### **Purpose**
- To streamline task management and enhance efficiency by automating repetitive workflows.

### **Key Automations**
1. **Task Updates on Kanban Board**:
   - Automatically move tasks between Kanban board columns based on issue status:
     - When an issue is opened: Move to **Backlog**.
     - When work begins: Move to **In Progress**.
     - When closed: Move to **Done**.

2. **Testing Integration**:
   - Automatically run tests for tasks in the **Testing** column.
   - Notify of pass/fail status directly in the issue thread.

3. **Reminders for Overdue Tasks**:
   - Send reminders for tasks tagged as **High Priority (MVP)** that are nearing their due date or are overdue.

4. **Time Tracking Integration**:
   - Trigger Clockify logs for tasks when they move to **In Progress**.

5. **Pull Request Checks**:
   - Ensure all tasks linked to the pull request meet their completion criteria (e.g., labels, milestones, and testing checks).

---

## **GitHub Issue Labels**

### **Categories and Descriptions**

| **Label**                | **Description**                                                                                 | **Color**   |
|--------------------------|-------------------------------------------------------------------------------------------------|-------------|
| **testing**              | Tasks related to creating and executing tests (unit, integration, end-to-end).                 | `#F4B400`  |
| **accessibility**        | Tasks ensuring accessibility compliance for all users.                                         | `#468499`  |
| **api**                  | Backend tasks for Koa.js API and database integrations.                                        | `#8b0000`  |
| **authentication**       | Tasks for user login, logout, and session management using Firebase.                           | `#ff4500`  |
| **bug**                  | Issues related to broken or malfunctioning features.                                           | `#dc143c`  |
| **collaboration**        | Tasks for enabling shared task responsibilities (future functionality).                        | `#6a5acd`  |
| **critical**             | High-priority issues requiring immediate resolution.                                           | `#ff0000`  |
| **documentation**        | Improvements or additions to project Markdown files.                                           | `#0075ca`  |
| **enhanced-features**    | Tasks for implementing non-core features like reminders or notifications.                      | `#9932cc`  |
| **epics**                | High-level tasks or milestones covering multiple user stories.                                 | `#800080`  |
| **firebase-integration** | Issues involving Firebase authentication or configuration.                                     | `#ffb300`  |
| **mobile-app**           | Development tasks for the React Native mobile app.                                             | `#1e90ff`  |
| **notifications**        | Features for updates or real-time user notifications.                                          | `#FF4500`  |
| **performance**          | Tasks for app or API optimizations (e.g., caching, query optimization).                        | `#6b8e23`  |
| **project-management**   | Used for managing workflows, boards, and time tracking.                                        | `#ff7b72`  |
| **research-and-planning**| Investigative tasks related to architecture, workflows, or feature feasibility.                | `#ff8c00`  |
| **state-management**     | Tasks involving Redux implementation or improvements.                                          | `#f4a460`  |
| **styling-reuse**        | Reusing or updating components from Morro Taxi or Jam Room.                                    | `#4682b4`  |
| **task-management**      | Issues for creating, editing, deleting, or completing to-dos.                                  | `#228b22`  |
| **task-organization**    | Features for tagging, setting due dates, and filtering tasks.                                  | `#2e8b57`  |
| **user-stories**         | Refining or reviewing user stories and acceptance criteria.                                    | `#daa520`  |

---

## **Risk Management**

### **Potential Risks**
1. **Missed Deadlines**:
   - Mitigation: Weekly progress reviews and clear task assignments.
2. **Scope Creep**:
   - Mitigation: Stick to planned goals for each sprint; defer new ideas to a backlog.
3. **Burnout**:
   - Mitigation: Set realistic goals for each sprint and prioritize rest and balance.

---
