export const mock2 = `MSH|^~\\&|ED_SYSTEM|HOSPITAL_NAME|LAB_SYSTEM|HOSPITAL_NAME|202501241200||ADT^A01|987654321|P|2.5.1
PID|1||321987654^^^HOSPITAL_NAME^MRN||Martinez^Carlos^J^^Mr.||19850712|M||Latino|456 Oak Ave.^^Anycity^NY^10011||(555)555-1212||(555)555-3434|Spanish|Single|||987-65-4321
PV1|1|E|ED1^05^02||||87654^Lee^Angela^Dr.||||||ER|||||123456^Nguyen^David^T^MD||||||||||||||||||||||||202501241205|||||||9876.54
DG1|1||S06.5X1A^Traumatic Subdural Hemorrhage with LOC^ICD-10|Acute subdural hematoma due to fall.|202501241200||A
DG1|2||F10.129^Alcohol Abuse with Intoxication^ICD-10|Alcohol intoxication without behavioral disturbance.|202501241200||A
PR1|1|202501241210|70450|Head CT Without Contrast|Ordered to evaluate for intracranial bleeding.
NTE|1||ED Triage Note: Patient found on sidewalk with facial abrasions and smelling of alcohol. Witness reports fall with brief LOC. Patient confused and combative on arrival.
NTE|2||Physical Exam: Vitals: T 36.7°C, HR 110, RR 20, BP 130/85, SpO2 96%. Neuro: Disoriented x2, positive Battle’s sign. HEENT: Periorbital ecchymosis. No midline C-spine tenderness.
NTE|3||ED Progress Note: Head CT performed; reveals acute subdural hematoma. BAC 0.19%. Neurosurgery consulted. Patient admitted for observation. Will monitor GCS and neuro checks.
RXA|0|1|202501241215||0038-0020-10^Lorazepam^NDC|1 mg|IV|Administered for agitation.||^^|^RN^Smith^Julia||202501241216
ORC|NW|ORD98765432|ORDER202501241210|987654321|SC||1|W|202501241210|||Dr. Lee^Angela||ED|Head CT ordered for evaluation of trauma.
OBR|1|ORD98765432|ORDER202501241210|70450^Head CT^RAD|||202501241210|||||||Dr. Nguyen^David^T|||202501241210|202501241225|||STAT||||||||||||||||Radiology report pending.
OBX|1|NM|2823-3^BAC^LAB|1|0.19|g/dL|0.00-0.08|H|||F|||202501241230
OBX|2|ST|18747-6^CT Findings^LOINC|1|Acute left-sided subdural hematoma noted.||Radiology||||202501241225
NTE|4||ED Disposition: Patient diagnosed with subdural hematoma. Admitted for neurosurgical observation. Continues under BAC monitoring and neuro checks every hour.`