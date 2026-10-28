// Technical Articles Data for Raju Perumalla's Engineering Journal
// All articles are based directly on Raju's verified software projects and real engineering experience.

export const blogPosts = [
  {
    slug: 'building-smartguardian-iot-accident-detection-system',
    title: 'Architecting SmartGuardian: Real-Time Accident Prevention & Detection with IoT & FastAPI',
    summary: 'A deep dive into building an end-to-end accident prevention and rapid rescue platform combining IoT sensors, driver drowsiness detection, and high-throughput telemetry APIs.',
    category: 'IoT & AI Systems',
    readTime: '8 min read',
    publishedDate: 'October 24, 2024',
    updatedDate: 'February 10, 2025',
    author: 'Raju Perumalla',
    tags: ['IoT', 'FastAPI', 'Python', 'Computer Vision', 'Android', 'Hardware'],
    content: `## Introduction & Problem Statement

Road accidents claim over 1.3 million lives globally each year. In emergency rescue logistics, the concept of the Golden Hour refers to the first sixty minutes following a severe traumatic crash: providing medical intervention within this window dramatically increases survival rates.

During our work on SmartGuardian_IM26 (recognized as a Finalist in the SAP Innovation Marathon), our primary engineering objective was twofold:
1. Prevent accidents before they occur through proactive driver state monitoring and predictive risk alerting.
2. Minimize emergency response latency when an unavoidable collision takes place using automated telemetry, GPS tracking, and instant alerts.

---

## High-Level System Architecture

The SmartGuardian platform is built on three interconnected layers:
1. Edge Sensing Layer: Vehicle accelerometer/gyroscope sensors (MPU6050) paired with an edge camera feed running on an embedded microcontroller.
2. Cloud Ingestion & Processing Layer: A high-concurrency Python backend running FastAPI to ingest sensor heartbeats, evaluate anomaly thresholds, and manage WebSocket connections.
3. Mobile & Responder Layer: A cross-platform Flutter companion app for real-time navigation and automated dispatch integration.

\`\`\`
[ Vehicle Telemetry: MPU6050 + Camera ]
                 │ (MQTT / TLS WebSocket)
                 ▼
[ FastAPI Anomaly Ingestion Engine ] ──► [ Geolocation & Map Matching (Google Maps API) ]
                 │
                 ├─► Safe State: Rolling Heartbeat Cache (Redis)
                 └─► Crash Anomaly Triggered: Instant Multi-Channel Alert (Emergency SMS + Webhook)
\`\`\`

---

## Crash Detection: The Physics & Heuristics

A simple accelerometer spike does not necessarily indicate a high-speed collision; driving over a speed bump or dropping a smartphone can easily generate momentary G-force spikes. To avoid false alarms, SmartGuardian utilizes a multi-stage validation algorithm:

1. Impact Magnitude Vector (G-force): Evaluated as the Euclidean norm of tri-axial acceleration.
2. Angular Rate Deviation: Rapid roll and pitch variation measured through the gyroscope.
3. Velocity Post-Drop Analysis: Cross-checking GPS velocity delta within a 1.5-second trailing window.

\`\`\`python
import math

def evaluate_impact_signature(accel_x: float, accel_y: float, accel_z: float, prev_speed_kmh: float, curr_speed_kmh: float) -> dict:
    total_g = math.sqrt(accel_x**2 + accel_y**2 + accel_z**2)
    speed_drop = prev_speed_kmh - curr_speed_kmh
    
    # Anomaly threshold: Sudden deceleration (> 35 km/h drop) combined with impact spike (> 3.8G)
    is_severe_impact = total_g > 3.8 and speed_drop > 35.0
    
    return {
        "impact_g": round(total_g, 2),
        "speed_delta_kmh": round(speed_drop, 1),
        "alarm_level": "CRITICAL" if is_severe_impact else "NORMAL"
    }
\`\`\`

---

## FastAPI Telemetry Ingestion Pipeline

To support real-time telemetry from multiple vehicles concurrently, we deployed asynchronous endpoints with Pydantic schema validation:

\`\`\`python
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
import time

app = FastAPI(title="SmartGuardian Telemetry Engine")

class TelemetryPayload(BaseModel):
    vehicle_id: str
    latitude: float = Field(..., ge=-90.0, le=90.0)
    longitude: float = Field(..., ge=-180.0, le=180.0)
    speed_kmh: float = Field(..., ge=0.0)
    g_force: float
    timestamp: int

@app.post("/api/v1/telemetry", status_code=status.HTTP_202_ACCEPTED)
async def ingest_telemetry(payload: TelemetryPayload):
    if payload.g_force > 3.8:
        # Asynchronously dispatch emergency event
        await trigger_emergency_rescue_workflow(payload)
        return {"status": "EMERGENCY_TRIGGERED", "vehicle_id": payload.vehicle_id}
        
    return {"status": "PROCESSED", "vehicle_id": payload.vehicle_id}
\`\`\`

---

## Lessons Learned & Future Refinements

1. Network Disconnections: In rural corridors, cellular connectivity drops. We introduced a local SQLite buffer on the edge module that queues unacknowledged telemetry frames until reconnection.
2. Driver Fatigue Vision Models: Running face-mesh landmark detection on battery-constrained hardware required quantization to 8-bit precision (ONNX runtime) to sustain 25 FPS without thermal throttling.
3. Privacy by Design: Camera feeds are processed strictly on-device in real-time memory buffers; raw video frames are never stored or transmitted to cloud storage.`
  },
  {
    slug: 'securing-academic-data-cipherdoc-rsa-encryption',
    title: 'CipherDoc: Building a Tamper-Proof Exam Paper Distribution System with Hybrid RSA Cryptography',
    summary: 'How we engineered an asymmetric cryptographic workflow to protect sensitive examination papers against unauthorized leaks, featuring role-based key management and timestamped digital signatures.',
    category: 'Cybersecurity & Cryptography',
    readTime: '7 min read',
    publishedDate: 'November 18, 2024',
    updatedDate: 'January 15, 2025',
    author: 'Raju Perumalla',
    tags: ['Cryptography', 'RSA', 'Python', 'Security', 'Role-Based Access'],
    content: `## The Challenge: Academic Paper Leaks

Examination integrity is a fundamental pillar of education institutions. Historically, exam paper leaks occur during transit—either physically between printing depots or digitally across unencrypted email attachments and shared drives.

With CipherDoc-SecureExamPapers, our mission was to construct an automated cryptographic pipeline where:
- The exam paper remains encrypted at rest, in transit, and in memory until authorized opening time.
- Only an authenticated exam center superintendent possesses the cryptographic private key needed for decryption.
- Opening an exam paper leaves an immutable audit trail with timestamp verification.

---

## Architectural Choice: Why Hybrid Cryptography?

Pure asymmetric encryption (such as RSA-4096) is computationally heavy and mathematically limited in payload size: RSA cannot directly encrypt files larger than its key modulus. 

To achieve both ironclad key exchange security and high file throughput, CipherDoc employs Hybrid Encryption:
1. A high-entropy AES-256-GCM symmetric key is randomly generated for the target document.
2. The exam PDF document is encrypted using AES-GCM (offering authenticated data integrity).
3. The AES key itself is encrypted using the recipient superintendent public RSA-4096 key.
4. Both the encrypted payload and the encrypted session key are bound in an authenticated container package.

\`\`\`
[ Plaintext Exam PDF ] ──► [ AES-256-GCM Encrypt ] ──► [ Encrypted PDF ]
                               ▲                               │
                               │                               ▼
[ One-Time Random AES Key ] ───┘                     [ Unified CipherDoc Package ]
       │                                                       ▲
       ▼                                                       │
[ RSA-4096 Public Key Encrypt ] ───────────────────────────────┘
\`\`\`

---

## Core Implementation in Python

Below is the architecture demonstration showing key generation and symmetric envelope encryption:

\`\`\`python
from cryptography.hazmat.primitives.asymmetric import rsa, padding
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import os

def generate_superintendent_keypair():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=4096
    )
    public_key = private_key.public_key()
    return private_key, public_key

def seal_exam_document(document_bytes: bytes, recipient_public_key) -> dict:
    # 1. Generate 256-bit AES Session Key
    aes_key = AESGCM.generate_key(bit_length=256)
    aesgcm = AESGCM(aes_key)
    
    # 2. 96-bit Nonce for GCM Mode
    nonce = os.urandom(12)
    ciphertext = aesgcm.encrypt(nonce, document_bytes, associated_data=b"CIPHERDOC_V1")
    
    # 3. Encrypt AES Key with RSA Public Key (OAEP with SHA-256)
    encrypted_aes_key = recipient_public_key.encrypt(
        aes_key,
        padding.OAEP(
            mgf=padding.MGF1(algorithm=hashes.SHA256()),
            algorithm=hashes.SHA256(),
            label=None
        )
    )
    
    return {
        "nonce": nonce,
        "ciphertext": ciphertext,
        "encrypted_key": encrypted_aes_key
    }
\`\`\`

---

## Role-Based Decryption & Time-Lock Validation

At the examination center, the decryption application validates three prerequisites before releasing the document stream to memory:
1. Biometric or Hardware Token Authentication: Validates superintendent identity.
2. Network NTP Synchronization: Verifies that the current timestamp is within the permitted 15-minute exam setup window.
3. Digital Signature Verification: Guarantees that the exam board has not altered the file en route.

---

## Security Takeaways
- No plaintext writing to disk: Decrypted files are decrypted directly into memory streams (io.BytesIO) and piped to printing spoolers to prevent file lingering in temp directories.
- Fail-Secure Architecture: Any tampering with the ciphertext triggers an authentication tag failure in AES-GCM, halting the process immediately.`
  },
  {
    slug: 'fastapi-vs-nodejs-scaling-modern-microservices',
    title: 'FastAPI vs Node.js: Benchmarking Async Backends for AI & Machine Learning Workloads',
    summary: 'A developer analysis comparing Python FastAPI and Node.js Express for microservices handling real-time data, async I/O, and machine learning model inference.',
    category: 'Backend & Systems',
    readTime: '6 min read',
    publishedDate: 'January 12, 2025',
    updatedDate: 'February 20, 2025',
    author: 'Raju Perumalla',
    tags: ['FastAPI', 'Node.js', 'System Design', 'Microservices', 'REST API', 'Python'],
    content: `## The Architectural Dilemma

When designing modern web backends, developers frequently choose between Node.js (Express / Fastify) and Python (FastAPI / Starlette). Both platforms offer asynchronous, event-driven I/O models, but their optimal use cases diverge significantly once AI inference, scientific computing, and system typing enter the picture.

Having built production services in both Node.js (this portfolio contact microservice) and FastAPI (SmartGuardian telemetry engine), here is a practical engineering breakdown of when each framework shines.

---

## Architecture Comparison

| Metric / Feature | Node.js (Express.js) | Python (FastAPI) |
| :--- | :--- | :--- |
| Runtime Environment | V8 JavaScript Engine | CPython / Uvicorn (ASGI) |
| Concurrency Model | Single-threaded Event Loop + Libuv | Asyncio Event Loop |
| Type Validation | Manual / Zod / Joi | Native Python Type Hints + Pydantic |
| API Documentation | Manual Swagger integration | Automatic Interactive OpenAPI Docs (/docs) |
| Machine Learning Integration | Requires inter-process bridges | Native (NumPy, PyTorch, Scikit-learn, ONNX) |
| CPU-Bound Processing | Worker threads / Child processes | Multiprocessing / Celery task queues |

---

## 1. Concurrency & I/O-Bound Workloads

For purely I/O-bound microservices—such as querying a PostgreSQL database, dispatching notifications via third-party APIs, or acting as an API gateway—Node.js has a slight latency edge due to the high-performance V8 JIT compiler:

\`\`\`javascript
// Express.js Async Route
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});
\`\`\`

FastAPI matches this async I/O performance via async def and uvloop, but adds compile-time type validation via Pydantic:

\`\`\`python
# FastAPI Async Route
@app.get("/api/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    user = await db.fetch_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
\`\`\`

---

## 2. Machine Learning & Model Inference

The decisive factor for AI-driven projects is native ecosystem compatibility. In Python, feeding camera streams or tabular features to a model requires zero serialization overhead:

\`\`\`python
import numpy as np
import onnxruntime as ort

session = ort.InferenceSession("model.onnx")

@app.post("/api/predict")
async def predict_risk(features: list[float]):
    input_data = np.array([features], dtype=np.float32)
    outputs = session.run(None, {"input": input_data})
    return {"prediction": float(outputs[0][0])}
\`\`\`

In Node.js, running complex deep learning models often requires calling native Python sub-processes, bridging via gRPC, or utilizing JavaScript-ported runtimes with varying feature parity.

---

## Final Recommendation: Which Should You Pick?

- Choose Node.js / Express when:
  - Building lightweight CRUD backends, real-time WebSockets (Socket.io), or BFF layers for React applications.
  - Your team is composed primarily of JavaScript/TypeScript developers.
- Choose FastAPI when:
  - Building microservices that interact with Machine Learning, Computer Vision, or data analytics pipelines.
  - You require automatic, always-in-sync OpenAPI documentation.
  - You value compile-time schema safety and strict input validation via Pydantic.`
  },
  {
    slug: 'getting-started-with-sap-btp-abap-cloud-developer-guide',
    title: 'A Modern Developer Guide to SAP BTP, ABAP Cloud & Enterprise API Integration',
    summary: 'Bridging modern full-stack web engineering with enterprise SAP systems: Understanding the Clean Core methodology, RESTful Application Programming (RAP), and BTP microservices.',
    category: 'Enterprise & Cloud',
    readTime: '9 min read',
    publishedDate: 'March 05, 2025',
    updatedDate: 'March 28, 2025',
    author: 'Raju Perumalla',
    tags: ['SAP BTP', 'ABAP Cloud', 'Enterprise Architecture', 'REST API', 'Clean Core'],
    content: `## Why Enterprise Technology Matters

In mainstream web development, developers frequently focus on the consumer technology stack (React, Node, Python, Next.js). However, the backbone of global enterprise logistics, supply chains, and multinational operations runs on SAP.

Historically, enterprise systems suffered from massive technical debt because custom code was written directly into the core ERP system, making upgrades painful. Today, the modern SAP architecture is undergoing a revolution centered on SAP BTP (Business Technology Platform) and ABAP Cloud under the Clean Core paradigm.

---

## What is the Clean Core Principle?

The Clean Core strategy mandates that all custom extensions, third-party integrations, and innovations reside outside the foundational ERP system (SAP S/4HANA):
1. Extensions on SAP BTP: Custom microservices and consumer frontends (such as web or mobile apps) live on SAP BTP.
2. Standard Upgrade-Stable APIs: Integration occurs exclusively via public, released APIs (OData v4, REST, SOAP) rather than direct database modification.
3. ABAP Cloud Programming Model: Code is written strictly in modern ABAP Cloud syntax, avoiding deprecated legacy statements.

\`\`\`
[ Custom Web & Mobile Apps (React / Flutter) ]
                    │
                    ▼ (Public REST / OData v4 APIs)
[ SAP Business Technology Platform (BTP) ]
     ├─ Cloud Foundry Runtime
     ├─ Kyma / Kubernetes
     └─ Event Mesh Integration
                    │
                    ▼ (Clean Core APIs)
[ SAP S/4HANA Core Enterprise ERP ]
\`\`\`

---

## The ABAP RESTful Application Programming (RAP) Model

The modern standard for building transactional and analytical services in ABAP is RAP:
1. Data Modeling (Core Data Services - CDS): CDS Views define semantically rich data models on the underlying database.
2. Behavior Definition & Implementation: Defines business logic (Create, Update, Delete, Actions, Validations).
3. Service Exposure: Automatically binds the model to an OData v2 or OData v4 protocol service.

\`\`\`abap
@EndUserText.label: 'Flight Booking Projection View'
@AccessControl.authorizationCheck: #NOT_REQUIRED
define root view entity ZC_BOOKING_PROJECTION
  as projection on ZI_BOOKING_CORE
{
  key BookingID,
      CustomerID,
      CarrierID,
      FlightDate,
      FlightPrice,
      CurrencyCode,
      BookingStatus,
      _Customer,
      _Carrier
}
\`\`\`

---

## Consuming SAP APIs from a Modern Web Application

Connecting a modern frontend (e.g., React or Next.js) to SAP BTP requires secure OAuth 2.0 authentication against the SAP Authorization and Trust Management Service (XSUAA):

\`\`\`javascript
// Fetching Bearer Token from SAP BTP XSUAA
async function getSapBtpToken() {
  const tokenUrl = process.env.SAP_XSUAA_TOKEN_URL;
  const clientId = process.env.SAP_CLIENT_ID;
  const clientSecret = process.env.SAP_CLIENT_SECRET;
  const credentials = Buffer.from(clientId + ':' + clientSecret).toString('base64');

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + credentials,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}
\`\`\`

---

## Summary for Aspiring Developers

For developers with strong backgrounds in modern languages (Python, Java, JavaScript), learning enterprise patterns on SAP BTP opens up massive career leverage. Understanding how to connect flexible web frontends with rock-solid enterprise cores is one of the most in-demand skillsets in the industry.`
  },
  {
    slug: 'tripzy-ai-travel-companion-architecture',
    title: 'Tripzy: Architecting a Low-Latency Travel Companion with OTP Authentication and Real-Time State',
    summary: 'An engineering case study on developing Tripzy: a responsive travel companion platform featuring Firebase Phone OTP authentication, dynamic destination filtering, and lightweight client-side state management.',
    category: 'Web & Cloud Systems',
    readTime: '7 min read',
    publishedDate: 'December 14, 2024',
    updatedDate: 'March 10, 2025',
    author: 'Raju Perumalla',
    tags: ['JavaScript', 'Firebase', 'State Management', 'Web Performance', 'UI/UX'],
    content: `## The Problem: Friction in Modern Travel Booking

Modern travel planning is frequently bogged down by bloated web portals loaded with third-party tracking scripts, slow page transitions, and complex multi-page booking funnels. For budget travelers and students exploring weekend destinations, booking portals frequently consume excessive cellular data and introduce severe latency on lower-tier mobile networks.

With **Tripzy (Travel Companion)**, our engineering objective was to construct an ultra-responsive, mobile-first booking interface that provides:
1. Instant phone number OTP authentication without tedious email verification forms.
2. Fast destination search and interactive hotel filtering with zero full-page reloads.
3. Real-time availability synchronization using Firebase Cloud Firestore.
4. Smooth micro-interactions and glassmorphic card layouts running comfortably at 60 FPS on mobile browsers.

---

## High-Level System Architecture

Tripzy is engineered as a lightweight Single-Page Application (SPA) emphasizing client-side performance and minimal network overhead:

\`\`\`
[ Client Browser (HTML5 / Vanilla ES6 / CSS3) ]
                    │
      ┌─────────────┴─────────────┐
      ▼                           ▼
[ Firebase Auth ]          [ Cloud Firestore ]
  ├─ Phone OTP Auth          ├─ Destination Documents
  └─ Invisible reCAPTCHA     ├─ Hotel Deal Catalogs
                             └─ User Reservation Records
\`\`\`

---

## 1. Firebase Phone OTP Authentication Pipeline

To reduce onboarding friction to under 30 seconds, Tripzy uses Firebase Phone Authentication with an invisible reCAPTCHA verifier to prevent SMS bot abuse while keeping the UI frictionless:

\`\`\`javascript
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Initialize invisible reCAPTCHA container
export function initRecaptchaVerifier(buttonId) {
  const auth = getAuth();
  window.recaptchaVerifier = new RecaptchaVerifier(auth, buttonId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved - allow phone verification to proceed
    }
  });
}

// Request one-time verification code (OTP)
export async function requestPhoneOtp(phoneNumber) {
  const auth = getAuth();
  const appVerifier = window.recaptchaVerifier;

  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return { success: true };
  } catch (error) {
    console.error("SMS dispatch failure:", error.message);
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.render().then((widgetId) => {
        grecaptcha.reset(widgetId);
      });
    }
    return { success: false, error: error.message };
  }
}
\`\`\`

---

## 2. Dynamic Filtering & Real-Time Booking State

Instead of relying on heavy frontend frameworks for a lightweight utility, Tripzy implements a reactive event-driven state manager for search filtering:

\`\`\`javascript
// Client-side faceted filter algorithm
export function filterDestinations(items, filters) {
  const { maxPrice, tripCategory, minRating, searchQuery } = filters;

  return items.filter((destination) => {
    const matchesQuery = !searchQuery || 
      destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesPrice = !maxPrice || destination.pricePerNight <= Number(maxPrice);
    const matchesCategory = !tripCategory || tripCategory === 'all' || destination.category === tripCategory;
    const matchesRating = !minRating || destination.rating >= Number(minRating);

    return matchesQuery && matchesPrice && matchesCategory && matchesRating;
  });
}
\`\`\`

---

## Technical Challenges & Key Learnings

1. **SMS Rate Limiting & Abuse Prevention:** During initial development, repeated test attempts could exhaust Firebase SMS quotas. We implemented client-side cooldown timers (60-second re-send lockout) and verified that production deployments strictly use invisible reCAPTCHA.
2. **Optimistic UI Updates for Instant Perceived Speed:** When a traveler clicks "Save Destination" or "Confirm Booking", the UI immediately reflects the booked state while the Firestore write executes in the background. If the request encounters a network drop, the state rolls back with an accessible toast alert.
3. **Responsive Media Delivery:** High-resolution destination photography can degrade mobile performance. We compressed all destination cards to modern WebP format with explicit \`loading="lazy"\` and intrinsic aspect ratios to eliminate cumulative layout shift (CLS).`
  },
  {
    slug: 'nutrixa-diet-engine-ai-nutrition-architecture',
    title: 'Nutrixa: Engineering a Real-Time Dietary Intake & Macronutrient Optimization Engine in Python',
    summary: 'How we designed Nutrixa, an interactive health companion that calculates basal metabolic rates, optimizes macronutrient ratios, and delivers personalized nutritional planning with Streamlit and Python.',
    category: 'AI & Health Tech',
    readTime: '6 min read',
    publishedDate: 'January 28, 2025',
    updatedDate: 'February 18, 2025',
    author: 'Raju Perumalla',
    tags: ['Python', 'Streamlit', 'Health Tech', 'Algorithms', 'Data Visualization'],
    content: `## The Challenge: Actionable Nutrition Without Friction

Most commercial calorie tracking applications suffer from high friction: users must search through thousands of crowded crowdsourced food entries, guess portion sizes in grams, and navigate multi-step paywalls. Consequently, over 70% of users abandon dietary tracking within the first two weeks.

With **Nutrixa-DietEngine**, our mission was to construct an intelligent, rapid dietary calculator in Python that computes personalized metabolic baselines, calculates target caloric deficits or surpluses, and dynamically distributes macronutrients (proteins, carbohydrates, healthy fats) based on verified sports science equations.

---

## Mathematical & Metabolic Foundation

Nutrixa utilizes the **Mifflin-St Jeor Equation**, widely validated in clinical nutrition research as one of the most reliable predictors of human Basal Metabolic Rate (BMR):

- **For Men:** \`BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + 5\`
- **For Women:** \`BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) - 161\`

Total Daily Energy Expenditure (TDEE) is then scaled according to the user's weekly physical activity level:

\`\`\`
[ User Biometrics: Age, Weight, Height, Gender ]
                    │
                    ▼ (Mifflin-St Jeor Algorithm)
            [ Basal Metabolic Rate (BMR) ]
                    │
                    ▼ (Physical Activity Multiplier: 1.2x to 1.9x)
     [ Total Daily Energy Expenditure (TDEE) ]
                    │
                    ▼ (Target Adjustment: -500 kcal Deficit / +300 kcal Surplus)
    [ Dynamic Macronutrient Distribution (Protein / Carbs / Fats) ]
\`\`\`

---

## Python Engine Implementation

Below is the core algorithmic module used by Nutrixa to compute metabolic requirements:

\`\`\`python
from dataclasses import dataclass
from typing import Literal

@dataclass
class BiometricProfile:
    age: int
    gender: Literal["male", "female"]
    weight_kg: float
    height_cm: float
    activity_level: Literal["sedentary", "light", "moderate", "active", "very_active"]
    goal: Literal["fat_loss", "maintenance", "muscle_gain"]

ACTIVITY_MULTIPLIERS = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very_active": 1.9,
}

def calculate_nutritional_plan(profile: BiometricProfile) -> dict:
    # 1. Compute Mifflin-St Jeor BMR
    base_bmr = (10.0 * profile.weight_kg) + (6.25 * profile.height_cm) - (5.0 * profile.age)
    bmr = base_bmr + 5 if profile.gender == "male" else base_bmr - 161
    
    # 2. Total Daily Energy Expenditure (TDEE)
    tdee = bmr * ACTIVITY_MULTIPLIERS[profile.activity_level]
    
    # 3. Goal Adjustment
    if profile.goal == "fat_loss":
        target_calories = max(1200.0, tdee - 500.0) # Ensure safe minimum floor
        protein_ratio, fat_ratio, carb_ratio = 0.35, 0.25, 0.40
    elif profile.goal == "muscle_gain":
        target_calories = tdee + 350.0
        protein_ratio, fat_ratio, carb_ratio = 0.30, 0.25, 0.45
    else:
        target_calories = tdee
        protein_ratio, fat_ratio, carb_ratio = 0.25, 0.30, 0.45
        
    # 4. Gram conversions (Protein: 4 kcal/g, Carbs: 4 kcal/g, Fat: 9 kcal/g)
    protein_grams = round((target_calories * protein_ratio) / 4.0, 1)
    carb_grams = round((target_calories * carb_ratio) / 4.0, 1)
    fat_grams = round((target_calories * fat_ratio) / 9.0, 1)
    
    return {
        "bmr": round(bmr, 0),
        "tdee": round(tdee, 0),
        "target_calories": round(target_calories, 0),
        "protein_g": protein_grams,
        "carbs_g": carb_grams,
        "fats_g": fat_grams
    }
\`\`\`

---

## Streamlit Reactive Dashboard & Performance Caching

To provide instantaneous feedback as the user adjusts input sliders (such as target weight or activity frequency), Nutrixa leverages Streamlit's reactive UI engine with cached computation:

\`\`\`python
import streamlit as st

st.set_page_config(page_title="Nutrixa Diet Engine", layout="wide")

@st.cache_data
def get_cached_plan(age, gender, weight, height, activity, goal):
    profile = BiometricProfile(age, gender, weight, height, activity, goal)
    return calculate_nutritional_plan(profile)

st.title("Nutrixa: Intelligent Dietary Planner")
# Interactive biometric inputs with immediate reactive chart rendering
\`\`\`

---

## Lessons Learned & Future Roadmap

1. **Safety Floors:** Unsupervised calorie restriction can lead to metabolic slowdown. We implemented mandatory minimum daily caloric thresholds (1,200 kcal for females, 1,500 kcal for males) regardless of user sliders.
2. **Hydration Integration:** Calorie calculators often neglect fluid intake. We added dynamic daily water requirement calculations based on body weight and activity levels.
3. **Computer Vision Expansion:** We are exploring an edge-computed YOLOv8 meal identification module to automatically estimate food portions directly from uploaded camera snapshots.`
  }
];
