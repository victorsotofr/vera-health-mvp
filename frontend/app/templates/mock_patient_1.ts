export const mock1 = `MSH|^~\\&|ED_SYSTEM|HOSPITAL_NAME|LAB_SYSTEM|HOSPITAL_NAME|202501240945||ADT^A01|123456789|P|2.5.1
PID|1||789123456^^^HOSPITAL_NAME^MRN||Johnson^Mary^L^^Mrs.||19581020|F||Hispanic|789 Pine St.^^Anytown^CA^90212||(555)555-5678||(555)555-8765|English|Widowed|||123-45-6789
PV1|1|E|ED2^08^01||||23456^Adams^Michael^Dr.||||||ER|||||567890^Clark^Susan^P^MD||||||||||||||||||||||||202501241000|||||||2345.67
AL1|1|DA|003^Shellfish^HL70055|Severe|20240101
DG1|1||I50.22^Chronic Systolic Heart Failure with Acute Decompensation^ICD-10|Severe exacerbation of chronic heart failure.|202501240945||A
DG1|2||N18.3^Chronic Kidney Disease, Stage 3^ICD-10|Chronic kidney disease stage 3.|202501240945||A
DG1|3||I21.3^Acute Myocardial Infarction, Anterior Wall^ICD-10|STEMI confirmed by ECG and troponin levels.|202501240945||A
PR1|1|202501240950|99284|IV Nitroglycerin Drip|Started for chest pain management.
PR1|2|202501240955|92941|Cardiac Catheterization|Scheduled for emergent PCI.
NTE|1||ED Triage Note: Patient arrived via EMS for sudden onset of severe chest pain radiating to the left arm and jaw, accompanied by shortness of breath and diaphoresis. Pain started 2 hours ago, rated 9/10. Past medical history includes congestive heart failure and chronic kidney disease. Medications include carvedilol, lisinopril, and furosemide.
NTE|2||Physical Exam: General: Obese elderly female in significant distress. Vitals: Temp 36.9°C, HR 125, RR 24, BP 85/50, SpO2 92% RA. Chest: S1, S2 with gallop. Lungs: Bibasilar crackles. Neuro: A&O x3. Skin: Diaphoretic.
NTE|3||ED Progress Note: ECG shows ST-segment elevation in anterior leads (V1-V4). Labs reveal troponin 10 ng/mL and metabolic acidosis (pH 7.25, HCO3 18). IV nitroglycerin started for chest pain. Emergent PCI planned. Consent obtained for catheterization. Patient remains hypotensive; norepinephrine drip initiated.
RXA|0|1|202501240950||0169-1751-10^Nitroglycerin^NDC|5 mcg/min|IV|Started for chest pain management.||^^|^RN^Taylor^Emily||202501240951
RXA|0|2|202501240955||0009-0055-11^Norepinephrine^NDC|2 mcg/min|IV|Started for hypotension.||^^|^RN^Taylor^Emily||202501240956
ORC|NW|ORD12345678|ORDER202501240950|123456789|SC||1|W|202501240950|||Dr. Adams^Michael||Cardiology|Cardiac catheterization: emergent PCI.
OBR|1|ORD12345678|ORDER202501240950|PCI^Percutaneous Coronary Intervention^CARD|||202501240955|||||||Dr. Clark^Susan^P|||202501240955|202501241015|||STAT||||||||||||||||Procedure Report Pending.
OBX|1|NM|67151-1^Troponin^LAB|1|10|ng/mL|<0.05|H|||F|||202501241000
OBX|2|NM|19945-2^ABG pH^LAB|1|7.25||7.35-7.45|L|||F|||202501241000
OBX|3|NM|2028-9^HCO3^LAB|1|18|mmol/L|22-26|L|||F|||202501241000
OBX|4|ST|32207-3^ECG Findings^LOINC|1|ST-segment elevation in V1-V4 consistent with anterior wall STEMI.|Cardiology Report||||202501241010
NTE|4||ED Disposition: Diagnosed with anterior STEMI. Patient undergoing emergent PCI. Remains on norepinephrine and nitroglycerin drips. Admitted to CCU for post-PCI monitoring.`