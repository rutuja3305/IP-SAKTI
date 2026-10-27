\# IP-SAKTI — AI-Powered Intellectual Property \& Innovation Intelligence



\*\*Discover. Analyze. Innovate. Protect.\*\*



IP-SAKTI is an AI-powered intellectual property and innovation intelligence platform designed to make knowledge discovery, innovation analysis, and IP-related research more accessible. It combines a modern web interface with a backend AI and Retrieval-Augmented Generation (RAG) pipeline to help users explore knowledge and obtain context-aware insights.



\## ✨ Overview



Understanding intellectual property and evaluating innovation can involve complex information spread across lengthy documents and multiple sources. IP-SAKTI aims to simplify this process through an intuitive digital platform that brings knowledge discovery and AI-assisted analysis into one place.



\## 🚀 Key Features



\- \*\*AI-Assisted Analysis:\*\* Explore innovation-related questions and generate AI-assisted insights.

\- \*\*RAG-Based Knowledge Processing:\*\* Process PDF documents and prepare their content for retrieval and contextual AI responses.

\- \*\*Document Ingestion:\*\* Scan and extract text from PDF-based knowledge sources.

\- \*\*Text Chunking:\*\* Divide extracted text into smaller, manageable chunks for downstream retrieval and processing.

\- \*\*Embedding Generation:\*\* Convert text into vector representations to support semantic retrieval workflows.

\- \*\*Innovation Intelligence:\*\* Explore innovation-related information through dedicated analysis and discovery interfaces.

\- \*\*Knowledge Atlas:\*\* Navigate knowledge and educational content through a structured interface.

\- \*\*Authentication Interfaces:\*\* User registration, login, role selection, and profile-related screens.

\- \*\*Modern Responsive UI:\*\* A component-based frontend built with React and TypeScript.



\*Note: Feature availability depends on the current implementation and configuration of the application and its external services.\*



\## 🛠️ Technology Stack



\### Frontend

\- React

\- TypeScript

\- Vite

\- Tailwind CSS

\- ESLint



\### Backend

\- Node.js

\- TypeScript

\- Groq SDK for LLM integration

\- Supabase client for backend service integration

\- PDF text extraction and document-processing utilities



\### AI / RAG Pipeline

\- PDF ingestion and text extraction

\- Text chunking

\- Text embeddings

\- Retrieval-oriented knowledge processing

\- LLM integration for AI-assisted responses



\## 🏗️ Architecture



```text

&#x20;                   IP-SAKTI

&#x20;                      |

&#x20;         +------------+------------+

&#x20;         |                         |

&#x20;    React Frontend             Backend API

&#x20;    TypeScript + Vite          Node.js + TypeScript

&#x20;         |                         |

&#x20;         |              +----------+----------+

&#x20;         |              |          |          |

&#x20;         |          PDF Ingestion Chunking  Embeddings

&#x20;         |              |          |          |

&#x20;         |              +----------+----------+

&#x20;         |                         |

&#x20;         |                  Knowledge Retrieval

&#x20;         |                         |

&#x20;         |                   Groq LLM

&#x20;         |                         |

&#x20;         +-------------------------+

&#x20;                   AI-Assisted

&#x20;                    Experience

```



The intended pipeline processes knowledge documents, extracts and chunks their text, generates embeddings, and uses retrieved context in AI-assisted workflows. The exact retrieval and storage configuration depends on the backend implementation.



\## 📁 Project Structure



```text

IP-SAKTI/

├── backend/

│   ├── data/

│   │   ├── documents/

│   │   └── source-inventory/

│   ├── src/

│   │   ├── lib/

│   │   │   ├── groq.ts

│   │   │   └── supabase.ts

│   │   ├── rag/

│   │   │   ├── chunking/

│   │   │   ├── embeddings/

│   │   │   ├── ingestion/

│   │   │   └── pdf/

│   │   └── server.ts

│   ├── package.json

│   └── tsconfig.json

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── components/

│   │   ├── context/

│   │   ├── data/

│   │   ├── hooks/

│   │   ├── pages/

│   │   ├── services/

│   │   └── styles/

│   ├── package.json

│   └── vite.config.ts

│

├── .gitignore

└── README.md

```



\## ⚙️ Getting Started



\### Prerequisites



Install the following before running the application:



\- Node.js and npm

\- Git

\- A Groq API key

\- Supabase project credentials if the configured backend features require Supabase



\### 1. Clone the repository



```bash

git clone https://github.com/rutuja3305/IP-SAKTI.git

cd IP-SAKTI

```



\### 2. Set up the backend



```bash

cd backend

npm install

```



Create a `.env` file inside the `backend/` directory:



```env

GROQ\_API\_KEY=your\_groq\_api\_key

SUPABASE\_URL=your\_supabase\_project\_url

SUPABASE\_SECRET\_KEY=your\_supabase\_secret\_key

```



Replace the placeholder values with your own credentials. Never commit your `.env` file or expose the Supabase secret key in frontend code.



Start the backend using the script configured in `backend/package.json`. For example, if the package defines a `dev` script:



```bash

npm run dev

```



\### 3. Set up the frontend



Open a second terminal:



```bash

cd frontend

npm install

npm run dev

```



Vite will display the local development URL in the terminal, commonly `http://localhost:5173`.



\### 4. Configure service connections



Before testing the full application, verify that:



\- The backend starts successfully.

\- The required environment variables are configured.

\- The frontend API base URL points to the running backend.

\- Any required Supabase tables, authentication settings, and vector-storage components are configured.



The exact setup may vary depending on the current backend implementation.



\## 🔐 Security



\- Keep API keys and service-role or secret keys in server-side environment variables.

\- Do not commit `.env` files, credentials, private datasets, or confidential documents.

\- Apply appropriate access controls to any stored user data and knowledge sources.

\- Review document licensing and redistribution permissions before publishing knowledge-base files.



\## 🗺️ Roadmap



Potential areas for further development include:



\- Improving semantic retrieval and knowledge-source traceability.

\- Adding source citations to AI-generated answers.

\- Expanding innovation and IP analysis workflows.

\- Improving document ingestion, metadata management, and retrieval evaluation.

\- Adding automated tests and deployment documentation.

\- Enhancing authentication, authorization, and production security.



\## 🤝 Contributing



Contributions, suggestions, and bug reports are welcome. For substantial changes, consider opening an issue first to discuss the proposed improvement.



\## 📄 License



A license has not yet been specified. All rights are reserved by default unless a license is added to the repository. Obtain permission before redistributing third-party documents or assets.



\## 👩‍💻 Author



\*\*Rutuja Jabras\*\*



GitHub: \[@rutuja3305](https://github.com/rutuja3305)



\---



\*IP-SAKTI — Making intellectual property knowledge and innovation intelligence more accessible through AI.\*



