# **📋 User Requirements Specification (Public View Dashboard)**

## **System Name**

Public Sentiment & Topic Trends Web Dashboard

---

# **1️⃣ Target User**

| User Type | Description | Goal |
| ----- | ----- | ----- |
| Public Viewer | General public / citizens / students | Observe sentiment and trending topics over time |

---

# **2️⃣ Functional Requirements (Public View Only)**

---

## **📊 A. Sentiment Trend Visualization**

| ID | Requirement |
| ----- | ----- |
| FR-PV-01 | The system shall display overall sentiment distribution (Positive, Neutral, Negative). |
| FR-PV-02 | The system shall display sentiment trends over time using a time-series graph. |
| FR-PV-03 | The system shall automatically update visualizations at regular intervals (near real-time). |
| FR-PV-04 | The system shall display total number of analyzed posts within the selected time range. |

---

## **🧠 B. Topic Detection & Visualization**

| ID | Requirement |
| ----- | ----- |
| FR-PV-05 | The system shall display detected topic clusters. |
| FR-PV-06 | The system shall display top keywords associated with each topic. |
| FR-PV-07 | The system shall visualize topic frequency over time. |
| FR-PV-08 | The system shall allow users to select a topic and view its sentiment distribution. |

---

## **🔄 C. Topic Evolution View**

| ID | Requirement |
| ----- | ----- |
| FR-PV-09 | The system shall show how topic prominence changes over time. |
| FR-PV-10 | The system shall allow users to compare two time periods. |
| FR-PV-11 | The system shall display emerging topics within the selected timeframe. |

---

## **🔎 D. Filtering Capabilities**

| ID | Requirement |
| ----- | ----- |
| FR-PV-12 | The system shall allow filtering by date range. |
| FR-PV-13 | The system shall allow filtering by sentiment category. |
| FR-PV-14 | The system shall allow filtering by keyword search. |

---

# **3️⃣ Non-Functional Requirements (Public View)**

---

## **⚡ Performance**

| ID | Requirement |
| ----- | ----- |
| NFR-PV-01 | The dashboard shall load within 3 seconds under normal network conditions. |
| NFR-PV-02 | The system shall refresh data within 5 seconds of receiving new processed data. |

---

## **📱 Usability**

| ID | Requirement |
| ----- | ----- |
| NFR-PV-03 | The dashboard shall be responsive across desktop and mobile devices. |
| NFR-PV-04 | The visualizations shall use intuitive labels and legends. |
| NFR-PV-05 | The system shall provide brief explanations of sentiment and topic metrics. |

---

## **🔐 Security & Ethics**

| ID | Requirement |
| ----- | ----- |
| NFR-PV-06 | The system shall anonymize all displayed data. |
| NFR-PV-07 | The system shall not display personally identifiable information (PII). |

