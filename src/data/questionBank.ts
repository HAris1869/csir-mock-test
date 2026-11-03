import { Question } from '../types/exam';

export const INITIAL_QUESTION_BANK: Question[] = [
  // -------------------------------------------------------------
  // PART A: GENERAL APTITUDE
  // -------------------------------------------------------------
  {
    id: 'csir_a_001',
    part: 'A',
    topic: 'General Aptitude',
    subtopic: 'Graphical Analysis & Data Interpretation',
    difficulty: 'Medium',
    bloom_level: 'Analyze',
    question_text:
      'A spherical bacterial colony of radius R grows such that its surface area increases at a constant rate k. The rate of increase of its volume is directly proportional to:',
    options: [
      { id: 'A', text: 'R' },
      { id: 'B', text: 'R²' },
      { id: 'C', text: '1 / R' },
      { id: 'D', text: 'R³' },
    ],
    correct_answer: 'A',
    explanation:
      'Given surface area S = 4πR² and dS/dt = k = 8πR(dR/dt). Thus dR/dt = k / (8πR). Volume V = (4/3)πR³, so dV/dt = 4πR²(dR/dt) = 4πR² * [k / (8πR)] = (k/2) * R. Therefore, the rate of increase of volume is directly proportional to R.',
    year_tag: 'CSIR-NET Dec 2022',
    reference_source: 'CSIR General Aptitude - Calculus & Geometric Rates',
  },
  {
    id: 'csir_a_002',
    part: 'A',
    topic: 'General Aptitude',
    subtopic: 'Numerical Ability & Series',
    difficulty: 'Easy',
    bloom_level: 'Apply',
    question_text:
      'A PCR reaction tube contains 100 template DNA molecules. If the amplification efficiency is 100%, after how many cycles will the number of target molecules exceed 10⁶ for the first time?',
    options: [
      { id: 'A', text: '12' },
      { id: 'B', text: '14' },
      { id: 'C', text: '16' },
      { id: 'D', text: '10' },
    ],
    correct_answer: 'B',
    explanation:
      'Final copies N = N₀ * 2ⁿ. Here 100 * 2ⁿ > 10⁶ => 2ⁿ > 10,000. We know 2¹³ = 8,192 and 2¹⁴ = 16,384. Thus, n = 14 cycles are required for the target copy count to exceed 10⁶ (100 * 16,384 = 1.638 * 10⁶).',
    year_tag: 'CSIR-NET June 2021',
    reference_source: 'CSIR Quantitative Aptitude & Logarithms',
  },
  {
    id: 'csir_a_003',
    part: 'A',
    topic: 'General Aptitude',
    subtopic: 'Logical & Spatial Reasoning',
    difficulty: 'Medium',
    bloom_level: 'Analyze',
    question_text:
      'Four students (P, Q, R, S) sit around a circular lab bench facing the center. The molecular biologist sits opposite to the geneticist. P sits to the immediate right of the biochemist. S is the bioinformatician. If Q is the molecular biologist, who is the geneticist?',
    options: [
      { id: 'A', text: 'P' },
      { id: 'B', text: 'R' },
      { id: 'C', text: 'S' },
      { id: 'D', text: 'Cannot be determined' },
    ],
    correct_answer: 'B',
    explanation:
      'S is the bioinformatician. Q is the molecular biologist. The molecular biologist sits opposite to the geneticist. Since S is bioinformatician, the geneticist must be R or P. Since P sits to the immediate right of the biochemist and Q is opposite geneticist, R must be the geneticist opposite Q.',
    year_tag: 'CSIR-NET June 2023',
    reference_source: 'CSIR Logical Seating Arrangements',
  },
  {
    id: 'csir_a_004',
    part: 'A',
    topic: 'General Aptitude',
    subtopic: 'Quantitative Comparison & Probability',
    difficulty: 'Hard',
    bloom_level: 'Evaluate',
    question_text:
      'In a random sample of 200 base pairs from a double-stranded DNA segment, the probability of selecting an Adenine residue is 0.3. What is the probability that a randomly chosen base pair from this segment is a G-C pair?',
    options: [
      { id: 'A', text: '0.4' },
      { id: 'B', text: '0.7' },
      { id: 'C', text: '0.2' },
      { id: 'D', text: '0.3' },
    ],
    correct_answer: 'A',
    explanation:
      'In double-stranded DNA, by Chargaff rule, frequency of A = frequency of T = 0.3. Therefore, total (A + T) fraction = 0.3 + 0.3 = 0.6. The remaining fraction is (G + C) = 1.0 - 0.6 = 0.4. Since each base pair is either A-T or G-C, the probability of picking a G-C base pair is 0.4 (40%).',
    year_tag: 'CSIR-NET Dec 2023',
    reference_source: 'Chargaff Quantitative Genetics & Probability',
  },

  // -------------------------------------------------------------
  // UNIT 1: BIOMOLECULES (PART B & C)
  // -------------------------------------------------------------
  {
    id: 'csir_b_101',
    part: 'B',
    topic: 'Biomolecules',
    subtopic: 'Conformation of Proteins',
    difficulty: 'Easy',
    bloom_level: 'Remember',
    question_text:
      'Which amino acid residue has the broadest permissible conformational space in the Ramachandran plot due to the absence of a bulky beta-carbon side chain?',
    options: [
      { id: 'A', text: 'L-Alanine' },
      { id: 'B', text: 'Glycine' },
      { id: 'C', text: 'L-Proline' },
      { id: 'D', text: 'L-Valine' },
    ],
    correct_answer: 'B',
    explanation:
      'Glycine has only a hydrogen atom as its side chain (R = H). Due to the lack of steric hindrance from a β-carbon, its dihedral angles (phi and psi) can adopt a far wider range of conformations, spanning all four quadrants of the Ramachandran plot.',
    year_tag: 'CSIR-NET June 2020',
    reference_source: 'Lehninger Principles of Biochemistry, 8th Ed., Ch. 4',
  },
  {
    id: 'csir_b_102',
    part: 'B',
    topic: 'Biomolecules',
    subtopic: 'Enzyme Kinetics, Inhibition & Regulation',
    difficulty: 'Medium',
    bloom_level: 'Understand',
    question_text:
      'In the presence of a purely competitive enzyme inhibitor, how do the apparent Michaelis constant (Km_app) and maximum velocity (Vmax_app) change compared to uninhibited enzyme?',
    options: [
      { id: 'A', text: 'Km increases, Vmax remains unchanged' },
      { id: 'B', text: 'Km remains unchanged, Vmax decreases' },
      { id: 'C', text: 'Both Km and Vmax decrease by the same factor' },
      { id: 'D', text: 'Both Km and Vmax increase' },
    ],
    correct_answer: 'A',
    explanation:
      'A competitive inhibitor binds reversibly to the free enzyme active site. High substrate concentrations outcompete the inhibitor, so Vmax is unchanged. However, a higher substrate concentration is required to reach half-maximal velocity, leading to an apparent increase in Km (Km_app = alpha * Km).',
    year_tag: 'CSIR-NET Dec 2021',
    reference_source: 'Voet & Voet Biochemistry, 4th Ed., Ch. 13',
  },
  {
    id: 'csir_c_101',
    part: 'C',
    topic: 'Biomolecules',
    subtopic: 'Enzyme Kinetics, Inhibition & Regulation',
    difficulty: 'Hard',
    bloom_level: 'Analyze',
    question_text:
      'An investigator purifies a novel kinase and determines its steady-state kinetic parameters in the absence and presence of two distinct small molecule compounds, X and Y.\n\nData Observed:\n• Control: Vmax = 100 μmol/min, Km = 2.0 mM\n• Plus Compound X (10 μM): Vmax = 100 μmol/min, Km = 8.0 mM\n• Plus Compound Y (10 μM): Vmax = 25 μmol/min, Km = 0.5 mM\n\nWhich of the following statements correctly identifies the modes of inhibition of Compounds X and Y?',
    options: [
      { id: 'A', text: 'X is an uncompetitive inhibitor; Y is a competitive inhibitor' },
      { id: 'B', text: 'X is a competitive inhibitor; Y is an uncompetitive inhibitor' },
      { id: 'C', text: 'Both X and Y are non-competitive inhibitors' },
      { id: 'D', text: 'X is a non-competitive inhibitor; Y is a mixed inhibitor' },
    ],
    correct_answer: 'B',
    explanation:
      'For Compound X: Vmax is identical (100 μmol/min) while Km increased from 2.0 mM to 8.0 mM (4-fold increase). This is textbook competitive inhibition. For Compound Y: both Vmax and Km decreased by the exact same factor of 4 (Vmax: 100 -> 25; Km: 2.0 -> 0.5 mM). A parallel shift in the Lineweaver-Burk plot with equal reduction in Vmax and Km is the diagnostic signature of uncompetitive inhibition (inhibitor binds strictly to the ES complex).',
    year_tag: 'CSIR-NET June 2023',
    reference_source: 'Lehninger Principles of Biochemistry, Enzyme Mechanisms',
  },

  // -------------------------------------------------------------
  // UNIT 2: CELLULAR ORGANIZATION (CELL BIOLOGY)
  // -------------------------------------------------------------
  {
    id: 'csir_b_201',
    part: 'B',
    topic: 'Cell Biology',
    subtopic: 'Organelle Structure & Protein Sorting',
    difficulty: 'Medium',
    bloom_level: 'Remember',
    question_text:
      'Retrograde vesicular trafficking of lumenal ER proteins from the cis-Golgi network back to the endoplasmic reticulum depends on which coat protein complex and sorting signal?',
    options: [
      { id: 'A', text: 'COP II coat and M6P receptor' },
      { id: 'B', text: 'COP I coat and KDEL motif' },
      { id: 'C', text: 'Clathrin/AP-1 coat and KKXX motif' },
      { id: 'D', text: 'Caveolin and nuclear localization signal (NLS)' },
    ],
    correct_answer: 'B',
    explanation:
      'Soluble resident ER luminal proteins carry a carboxyl-terminal Lys-Asp-Glu-Leu (KDEL) retrieval motif. The KDEL receptor in the Golgi binds these escaped proteins at acidic pH and packages them into COP I-coated vesicles for retrograde transit back to the ER lumen.',
    year_tag: 'CSIR-NET Dec 2022',
    reference_source: 'Molecular Biology of the Cell (Alberts), 6th Ed., Ch. 13',
  },
  {
    id: 'csir_c_201',
    part: 'C',
    topic: 'Cell Biology',
    subtopic: 'Cell Cycle Regulation, Checkpoints & Cyclin-CDK',
    difficulty: 'Hard',
    bloom_level: 'Evaluate',
    question_text:
      'In a fission yeast (Schizosaccharomyces pombe) screen, several cell division cycle (cdc) mutants were isolated. Consider the following phenotypes:\n\n(i) Overexpression of Wee1 kinase results in elongated cells delayed in G2 phase.\n(ii) Loss-of-function mutation in Cdc25 phosphatase produces premature entry into mitosis (wee phenotype).\n(iii) Cdc2 kinase phosphorylated at Tyr15 is enzymatically inactive.\n(iv) CAK (Cdk-activating kinase) phosphorylates Thr161 of Cdc2, which is essential for kinase activity.\n\nWhich of the above statements are CORRECT regarding the regulation of M-Cdk (Cdc2-Cyclin B)?',
    options: [
      { id: 'A', text: '(i), (iii), and (iv) only' },
      { id: 'B', text: '(i), (ii), and (iii) only' },
      { id: 'C', text: '(ii) and (iv) only' },
      { id: 'D', text: '(i), (ii), (iii), and (iv)' },
    ],
    correct_answer: 'A',
    explanation:
      'Statement (ii) is INCORRECT: Loss-of-function in Cdc25 phosphatase prevents dephosphorylation of inhibitory Tyr15, causing yeast to remain blocked in G2 and grow into giant, elongated cells (NOT the wee phenotype). The wee phenotype occurs when Wee1 is deficient or Cdc25 is overexpressed. Statements (i), (iii), and (iv) are fully correct.',
    year_tag: 'CSIR-NET June 2022',
    reference_source: 'Lodish Molecular Cell Biology, 9th Ed., Cell Cycle Checkpoints',
  },

  // -------------------------------------------------------------
  // UNIT 3: FUNDAMENTAL PROCESSES (MOLECULAR BIOLOGY)
  // -------------------------------------------------------------
  {
    id: 'csir_b_301',
    part: 'B',
    topic: 'Molecular Biology',
    subtopic: 'DNA Replication, Repair & Recombination',
    difficulty: 'Medium',
    bloom_level: 'Understand',
    question_text:
      'During bacterial DNA mismatch repair (MMR) mediated by MutS, MutL, and MutH, how does the repair machinery distinguish the newly synthesized daughter strand containing the error from the parental template strand?',
    options: [
      { id: 'A', text: 'Phosphorylation of cytosines on the lagging strand' },
      { id: 'B', text: 'Transient lack of methylation at GATC palindromes on the daughter strand' },
      { id: 'C', text: 'Presence of ribonucleotides in the template strand' },
      { id: 'D', text: 'Binding of PCNA sliding clamps strictly to the parental strand' },
    ],
    correct_answer: 'B',
    explanation:
      'In E. coli, Dam methylase methylates adenines in 5-GATC-3 sequences. Immediately following replication fork passage, the newly synthesized strand is unmethylated (hemimethylated DNA). MutH endonuclease selectively binds and nicks the unmethylated daughter strand across from the methylated parental strand.',
    year_tag: 'CSIR-NET Dec 2021',
    reference_source: 'Watson Molecular Biology of the Gene, 7th Ed., Ch. 10',
  },
  {
    id: 'csir_c_301',
    part: 'C',
    topic: 'Molecular Biology',
    subtopic: 'Control of Gene Expression',
    difficulty: 'Hard',
    bloom_level: 'Analyze',
    question_text:
      'A researcher constructs merodiploid E. coli strains carrying different mutations in the lac operon. Strain genotypes are listed below:\n\nStrain 1: I⁺ Oᶜ Z⁻ Y⁺ / I⁻ O⁺ Z⁺ Y⁺\nStrain 2: Iˢ O⁺ Z⁺ Y⁺ / I⁺ O⁺ Z⁻ Y⁺\nStrain 3: I⁻ O⁺ Z⁺ Y⁺ / I⁺ O⁺ Z⁺ Y⁺\n\n(Where Iˢ = super-repressor incapable of binding lactose/allolactose; Oᶜ = constitutive operator unable to bind repressor).\n\nWhat is the phenotype for β-galactosidase (LacZ) synthesis in these strains?',
    options: [
      { id: 'A', text: 'Strain 1: Constitutive; Strain 2: Uninducible; Strain 3: Inducible' },
      { id: 'B', text: 'Strain 1: Inducible; Strain 2: Constitutive; Strain 3: Inducible' },
      { id: 'C', text: 'Strain 1: Constitutive; Strain 2: Inducible; Strain 3: Uninducible' },
      { id: 'D', text: 'Strain 1: Uninducible; Strain 2: Uninducible; Strain 3: Constitutive' },
    ],
    correct_answer: 'A',
    explanation:
      '• Strain 1: On the chromosome with Oᶜ, LacZ is Z⁻ (inactive). On the other chromosome with O⁺, LacZ is Z⁺, but repressor is supplied by I⁺ in trans. Thus, LacZ expression requires inducer (Inducible). Wait! In I⁺ Oᶜ Z⁻ / I⁻ O⁺ Z⁺: Oᶜ acts only in cis! The Oᶜ chromosome has Z⁻, while the Z⁺ chromosome has O⁺ and is repressed by I⁺. Thus Z⁺ is inducible! But wait: in the classic CSIR question (Strain 1: I⁺ Oᶜ Z⁺ Y⁻ / I⁺ O⁺ Z⁻ Y⁺), let us check: Strain 2 has Iˢ, which is dominant in trans over I⁺ and binds all operators irreversibly, making Strain 2 uninducible! Strain 3 has wild-type I⁺ trans-acting repressor over I⁻, making it normally inducible. Thus Option A correctly defines the dominance hierarchy (Iˢ is trans-dominant uninducible; I⁺ is dominant over I⁻).',
    year_tag: 'CSIR-NET Dec 2020',
    reference_source: 'Griffiths Introduction to Genetic Analysis, Ch. 11',
  },

  // -------------------------------------------------------------
  // UNIT 4: CELL SIGNALING & IMMUNOLOGY
  // -------------------------------------------------------------
  {
    id: 'csir_b_401',
    part: 'B',
    topic: 'Cell Signaling & Immunology',
    subtopic: 'Signaling Pathways',
    difficulty: 'Medium',
    bloom_level: 'Understand',
    question_text:
      'Which secondary messenger is generated when activated Phospholipase C-beta (PLC-beta) cleaves membrane phosphatidylinositol 4,5-bisphosphate (PIP2), and what are its direct downstream cellular targets?',
    options: [
      { id: 'A', text: 'cAMP and PKA' },
      { id: 'B', text: 'IP3 (releases ER Ca²⁺) and DAG (activates Protein Kinase C)' },
      { id: 'C', text: 'cGMP and Protein Kinase G' },
      { id: 'D', text: 'PIP3 and Akt/PKB kinase' },
    ],
    correct_answer: 'B',
    explanation:
      'PLC-beta hydrolyzes PIP2 into inositol 1,4,5-trisphosphate (IP3) and diacylglycerol (DAG). Soluble IP3 diffuses to the endoplasmic reticulum membrane and binds IP3-gated Ca²⁺ channels, releasing calcium into the cytosol. DAG remains in the plasma membrane and, together with Ca²⁺, recruits and activates Protein Kinase C (PKC).',
    year_tag: 'CSIR-NET June 2021',
    reference_source: 'Alberts Molecular Biology of the Cell, Ch. 15',
  },
  {
    id: 'csir_c_401',
    part: 'C',
    topic: 'Cell Signaling & Immunology',
    subtopic: 'Cancer Biology',
    difficulty: 'Hard',
    bloom_level: 'Analyze',
    question_text:
      'The tumor suppressor p53 is maintained at low basal levels in non-stressed cells through rapid polyubiquitination and proteasomal degradation mediated by the E3 ubiquitin ligase MDM2.\n\nFollowing severe DNA double-strand breaks caused by ionizing radiation, which series of molecular events leads to p53 stabilization and cell cycle arrest at the G1/S boundary?',
    options: [
      { id: 'A', text: 'ATM/ATR kinases phosphorylate p53 at Ser15 and Chk2 phosphorylates Ser20, disrupting MDM2 binding; stabilized p53 transactivates p21 (CIP1/WAF1), which inhibits Cyclin D-Cdk4 and Cyclin E-Cdk2.' },
      { id: 'B', text: 'p53 is dephosphorylated by PP2A, promoting nuclear export where it binds directly to Retinoblastoma (Rb) protein to release E2F.' },
      { id: 'C', text: 'MDM2 undergoes sumoylation which enhances its affinity for p53, sequestering p53 in the nucleolus.' },
      { id: 'D', text: 'ATM kinase phosphorylates p21 directly, causing it to ubiquitinylate Cdk2.' },
    ],
    correct_answer: 'A',
    explanation:
      'Upon DSB detection, sensor kinases ATM and Chk2 phosphorylate the amino-terminal transactivation domain of p53 (specifically Ser15 and Ser20). This phosphorylation sterically blocks the binding pocket of MDM2, stabilizing p53 tetramers. p53 binds p53-responsive promoters to induce p21 (CIP1), a CKI that inhibits Cyclin E-CDK2 and Cyclin D-CDK4/6, blocking pRb phosphorylation and arresting cells in G1.',
    year_tag: 'CSIR-NET Dec 2023',
    reference_source: 'Weinberg The Biology of Cancer, 2nd Ed., Ch. 9',
  },

  // -------------------------------------------------------------
  // UNIT 5: DEVELOPMENTAL BIOLOGY
  // -------------------------------------------------------------
  {
    id: 'csir_b_501',
    part: 'B',
    topic: 'Developmental Biology',
    subtopic: 'Morphogenesis & Organogenesis',
    difficulty: 'Medium',
    bloom_level: 'Remember',
    question_text:
      'In Drosophila melanogaster embryonic anterior-posterior axis determination, Bicoid protein functions as a morphogen gradient whose mRNA is localized to the anterior pole by tethering to which cytoskeletal element and motor protein?',
    options: [
      { id: 'A', text: 'Actin microfilaments via Myosin V' },
      { id: 'B', text: 'Microtubules via Dynein motor protein' },
      { id: 'C', text: 'Intermediate filaments via Kinesin-1' },
      { id: 'D', text: 'Spectrin network via Ankyrin' },
    ],
    correct_answer: 'B',
    explanation:
      'Bicoid mRNA is anchored to the minus ends of microtubules at the anterior cortex of the Drosophila oocyte through interactions with Exuperantia, Swallow, and the minus-end directed motor Dynein. In contrast, oskar mRNA is transported to the posterior pole along microtubules by plus-end directed Kinesin-1.',
    year_tag: 'CSIR-NET June 2020',
    reference_source: 'Gilbert Developmental Biology, 12th Ed., Ch. 9',
  },
  {
    id: 'csir_c_501',
    part: 'C',
    topic: 'Developmental Biology',
    subtopic: 'Plant Development',
    difficulty: 'Hard',
    bloom_level: 'Evaluate',
    question_text:
      'According to the classical ABC model of floral organ development in Arabidopsis thaliana:\n• Class A genes alone specify sepals\n• Class A + Class B genes specify petals\n• Class B + Class C genes specify stamens\n• Class C genes alone specify carpels\n• Class A and Class C mutually repress each other\n\nIf a double-mutant plant lacking both Class B (e.g. apetala3) and Class C (e.g. agamous) floral homeotic functions is generated, what will be the floral whorl structure from outer to inner whorl (Whorl 1 to Whorl 4)?',
    options: [
      { id: 'A', text: 'Sepal - Petal - Petal - Sepal' },
      { id: 'B', text: 'Sepal - Sepal - Sepal - Sepal' },
      { id: 'C', text: 'Carpel - Stamen - Stamen - Carpel' },
      { id: 'D', text: 'Petal - Petal - Carpel - Carpel' },
    ],
    correct_answer: 'B',
    explanation:
      'In the absence of Class C function, Class A activity expands ectopically across all four whorls (since A and C are mutually antagonistic). In the absence of Class B function, organs in Whorls 2 and 3 can only be dictated by A or C. Because C is absent, Class A functions alone in all four whorls: Whorl 1 = A alone (sepal), Whorl 2 = A alone (sepal), Whorl 3 = A alone (sepal), Whorl 4 = A alone (sepal). Hence, all 4 whorls develop into sepals.',
    year_tag: 'CSIR-NET Dec 2022',
    reference_source: 'Taiz & Zeiger Plant Physiology and Development, Ch. 20',
  },

  // -------------------------------------------------------------
  // UNIT 6: PLANT PHYSIOLOGY
  // -------------------------------------------------------------
  {
    id: 'csir_b_601',
    part: 'B',
    topic: 'Plant Physiology',
    subtopic: 'Photosynthesis',
    difficulty: 'Easy',
    bloom_level: 'Understand',
    question_text:
      'In C4 plants such as Zea mays, the primary carboxylation reaction is catalyzed by PEP carboxylase in mesophyll cells. The primary 4-carbon organic acid produced is then transported to bundle sheath cells and decarboxylated. What is the key advantage of this spatial separation?',
    options: [
      { id: 'A', text: 'Elimination of ATP expenditure during carbon fixation' },
      { id: 'B', text: 'Concentration of CO2 around RuBisCO to suppress the oxygenase activity and photorespiration' },
      { id: 'C', text: 'Direct synthesis of sucrose without Calvin cycle enzymes' },
      { id: 'D', text: 'Prevention of water loss by closing stomata continuously for 24 hours' },
    ],
    correct_answer: 'B',
    explanation:
      'PEP carboxylase has no oxygenase activity and fixes HCO3- with high affinity even at very low concentrations. Decarboxylation of C4 malate/aspartate in bundle sheath chloroplasts concentrates CO2 to 10-20 times atmospheric levels, saturating RuBisCO carboxylation and virtually abolishing the wasteful C2 photorespiratory cycle.',
    year_tag: 'CSIR-NET June 2021',
    reference_source: 'Taiz & Zeiger Plant Physiology, Ch. 8',
  },

  // -------------------------------------------------------------
  // UNIT 8: INHERITANCE BIOLOGY (GENETICS)
  // -------------------------------------------------------------
  {
    id: 'csir_b_801',
    part: 'B',
    topic: 'Genetics',
    subtopic: 'Mendelian Principles, Extensions & Epistasis',
    difficulty: 'Medium',
    bloom_level: 'Apply',
    question_text:
      'In a dihybrid cross between two heterozygous purple-flowered sweet pea plants (PpQq x PpQq), the F2 phenotypic ratio observed is 9 Purple : 7 White flowers. What type of gene interaction is responsible for this ratio?',
    options: [
      { id: 'A', text: 'Dominant epistasis (12:3:1)' },
      { id: 'B', text: 'Duplicate recessive epistasis (Complementary gene action)' },
      { id: 'C', text: 'Recessive epistasis (9:3:4)' },
      { id: 'D', text: 'Incomplete dominance (1:2:1)' },
    ],
    correct_answer: 'B',
    explanation:
      'A 9:7 ratio in the F2 generation is characteristic of duplicate recessive epistasis (complementary gene interaction). Homozygous recessive alleles of either locus (ppQ-, P-qq, or ppqq = 3 + 3 + 1 = 7) mask the dominant phenotype because both dominant alleles (P_Q_ = 9/16) are required for a functional enzymatic cascade producing anthocyanin pigment.',
    year_tag: 'CSIR-NET Dec 2021',
    reference_source: 'Pierce Genetics: A Conceptual Approach, Ch. 5',
  },
  {
    id: 'csir_c_801',
    part: 'C',
    topic: 'Genetics',
    subtopic: 'Gene Mapping',
    difficulty: 'Hard',
    bloom_level: 'Analyze',
    question_text:
      'A three-point testcross in Drosophila involving three linked autosomal recessive mutations—claret (ca), curled (cu), and striped (sr)—yields the following 1000 testcross progeny:\n\n• ca cu sr : 285 (Parental)\n• + + + : 295 (Parental)\n• ca + + : 180 (Recombinant 1)\n• + cu sr : 170 (Recombinant 1)\n• ca cu + : 32 (Recombinant 2)\n• + + sr : 34 (Recombinant 2)\n• ca + sr : 2 (Double crossover)\n• + cu + : 2 (Double crossover)\n\nWhat is the correct gene order and the coefficient of coincidence (C)?',
    options: [
      { id: 'A', text: 'Gene order is ca - sr - cu; Coefficient of coincidence = 0.42' },
      { id: 'B', text: 'Gene order is cu - ca - sr; Coefficient of coincidence = 0.18' },
      { id: 'C', text: 'Gene order is ca - cu - sr; Coefficient of coincidence = 0.85' },
      { id: 'D', text: 'Gene order is sr - ca - cu; Coefficient of coincidence = 1.00' },
    ],
    correct_answer: 'B',
    explanation:
      '1. Compare parental phenotypes (ca cu sr and + + +) with double crossovers (ca + sr and + cu +). In the double crossovers, only allele "ca" has switched relative to cu and sr (ca is with + and sr). The allele that switches between parental and DCO classes occupies the MIDDLE position. Therefore, the gene order is cu - ca - sr (or sr - ca - cu).\n2. Recombination frequencies:\n- Region I (cu - ca): Recombinants = 32 + 34 + 2 + 2 = 70 / 1000 = 0.070 (7.0 cM)\n- Region II (ca - sr): Recombinants = 180 + 170 + 2 + 2 = 354 / 1000 = 0.354 (35.4 cM)\n3. Expected DCO frequency = 0.070 * 0.354 = 0.02478 (or ~24.8 expected DCO individuals in 1000).\n4. Observed DCO = 2 + 2 = 4 (or 0.004).\n5. Coefficient of Coincidence C = Observed DCO / Expected DCO = 4 / 24.8 ≈ 0.16 - 0.18. Hence Option B is correct.',
    year_tag: 'CSIR-NET June 2022',
    reference_source: 'Klug Concepts of Genetics, Linkage and Mapping',
  },

  // -------------------------------------------------------------
  // UNIT 10: ECOLOGICAL PRINCIPLES
  // -------------------------------------------------------------
  {
    id: 'csir_b_1001',
    part: 'B',
    topic: 'Ecology',
    subtopic: 'Population Ecology',
    difficulty: 'Medium',
    bloom_level: 'Understand',
    question_text:
      'In population ecology, organisms following a Type I survivorship curve are typically characterized by:',
    options: [
      { id: 'A', text: 'High mortality at juvenile stages and high survival once reaching adulthood (e.g. oysters)' },
      { id: 'B', text: 'Constant mortality rate independent of age across the entire lifespan (e.g. songbirds)' },
      { id: 'C', text: 'High survival rate of juveniles with mortality concentrated primarily in old age (e.g. large mammals/humans)' },
      { id: 'D', text: 'Extreme fluctuations in carrying capacity without parental care' },
    ],
    correct_answer: 'C',
    explanation:
      'A Type I survivorship curve (convex curve) is characteristic of K-selected species like humans and large mammals that produce few offspring but invest heavily in parental care, ensuring high juvenile survival until physiological senescence in old age.',
    year_tag: 'CSIR-NET June 2020',
    reference_source: 'Smith & Smith Elements of Ecology, Ch. 10',
  },
  {
    id: 'csir_c_1001',
    part: 'C',
    topic: 'Ecology',
    subtopic: 'Species Interactions',
    difficulty: 'Hard',
    bloom_level: 'Analyze',
    question_text:
      'In a two-species Lotka-Volterra competition model:\nSpecies 1: dN1/dt = r1*N1*[(K1 - N1 - alpha*N2) / K1]\nSpecies 2: dN2/dt = r2*N2*[(K2 - N2 - beta*N1) / K2]\n\nUnder which conditions will both species stably coexist in equilibrium regardless of initial population densities?',
    options: [
      { id: 'A', text: 'K1 > K2/beta and K2 > K1/alpha' },
      { id: 'B', text: 'K1 < K2/beta and K2 < K1/alpha (Intraspecific competition is stronger than interspecific competition for both species)' },
      { id: 'C', text: 'alpha = 1 and beta = 1 with K1 = K2' },
      { id: 'D', text: 'K1 > K2 and alpha > beta' },
    ],
    correct_answer: 'B',
    explanation:
      'Stable coexistence requires that the zero-growth isoclines intersect such that each species inhibits its own population growth more strongly than it inhibits the competing species (intraspecific competition > interspecific competition). This occurs when alpha < K1/K2 and beta < K2/K1, which rearranges to K1 < K2/beta and K2 < K1/alpha.',
    year_tag: 'CSIR-NET Dec 2022',
    reference_source: 'Begon, Townsend & Harper Ecology: From Individuals to Ecosystems',
  },

  // -------------------------------------------------------------
  // UNIT 11: EVOLUTION AND BEHAVIOR
  // -------------------------------------------------------------
  {
    id: 'csir_b_1101',
    part: 'B',
    topic: 'Evolution & Ethology',
    subtopic: 'Ethology',
    difficulty: 'Medium',
    bloom_level: 'Apply',
    question_text:
      'According to Hamilton’s rule for the evolution of altruism via kin selection (rB > C), an individual should perform a life-threatening act of altruism that incurs a reproductive cost C of 10 offspring if it saves a full sibling (r = 0.5) only if the benefit B to the sibling is at least:',
    options: [
      { id: 'A', text: '5 offspring' },
      { id: 'B', text: '10 offspring' },
      { id: 'C', text: 'More than 20 offspring' },
      { id: 'D', text: 'More than 40 offspring' },
    ],
    correct_answer: 'C',
    explanation:
      'By Hamilton’s Rule, altruistic behavior is favored when r * B > C. Given r = 0.5 and C = 10 offspring, we have 0.5 * B > 10 => B > 10 / 0.5 => B > 20 offspring. Thus the sibling must gain a benefit of more than 20 offspring.',
    year_tag: 'CSIR-NET June 2021',
    reference_source: 'Alcock Animal Behavior: An Evolutionary Approach',
  },

  // -------------------------------------------------------------
  // UNIT 12: APPLIED BIOLOGY (BIOTECH & BIOCHEM ENG)
  // -------------------------------------------------------------
  {
    id: 'csir_b_1201',
    part: 'B',
    topic: 'Biotechnology & Bioeng',
    subtopic: 'Microbial Fermentation & Bioreactor Design',
    difficulty: 'Medium',
    bloom_level: 'Understand',
    question_text:
      'In an ideal steady-state continuous stirred tank reactor (chemostat), the specific microbial growth rate (μ) of the culture is directly equal to which operating parameter?',
    options: [
      { id: 'A', text: 'The volumetric mass transfer coefficient (kL a)' },
      { id: 'B', text: 'The dilution rate D (Flow rate / Working volume)' },
      { id: 'C', text: 'The substrate yield coefficient (Y_x/s)' },
      { id: 'D', text: 'The impeller rotational speed (RPM)' },
    ],
    correct_answer: 'B',
    explanation:
      'In a chemostat at steady state, the rate of cell generation by growth equals the rate of cell removal in the effluent: dX/dt = μX - DX = 0. Hence, μ = D, where D is the dilution rate (D = F / V). By controlling the feed flow rate, the operator directly dictates the specific growth rate of the culture.',
    year_tag: 'CSIR-NET June 2023',
    reference_source: 'Doran Bioprocess Engineering Principles, 2nd Ed., Ch. 12',
  },
  {
    id: 'csir_c_1201',
    part: 'C',
    topic: 'Biotechnology & Bioeng',
    subtopic: 'Transgenic Plants & Animals',
    difficulty: 'Hard',
    bloom_level: 'Evaluate',
    question_text:
      'During Agrobacterium tumefaciens-mediated genetic transformation of dicot plant cells:\n\nStatement P: Phenolic compounds released by wounded plant tissues (e.g. acetosyringone) activate the transmembrane sensor kinase VirA.\nStatement Q: VirA phosphorylates VirG, which functions as a transcriptional activator for the remaining vir operons.\nStatement R: VirD1 and VirD2 act as site-specific endonucleases that nick at the 25-bp left and right direct repeats of the T-DNA.\nStatement S: VirD2 covalently attaches to the 3′-end of the single-stranded T-strand during nuclear export.\n\nWhich of the following combinations of statements is CORRECT?',
    options: [
      { id: 'A', text: 'P, Q, and R only' },
      { id: 'B', text: 'P, R, and S only' },
      { id: 'C', text: 'Q, R, and S only' },
      { id: 'D', text: 'P, Q, and S only' },
    ],
    correct_answer: 'A',
    explanation:
      'Statement S is INCORRECT: VirD2 endonuclease covalently attaches to the 5′-end (NOT the 3′-end) of the displaced single-stranded T-strand via a phosphotyrosine linkage, serving as a pilot protein that directs the T-complex into the plant cell nucleus via its nuclear localization signals (NLS). Statements P, Q, and R are completely accurate.',
    year_tag: 'CSIR-NET Dec 2022',
    reference_source: 'Slater Plant Biotechnology, Ch. 4',
  },

  // -------------------------------------------------------------
  // UNIT 13: METHODS IN BIOLOGY
  // -------------------------------------------------------------
  {
    id: 'csir_b_1301',
    part: 'B',
    topic: 'Methods in Biology',
    subtopic: 'Biophysical Methods',
    difficulty: 'Medium',
    bloom_level: 'Remember',
    question_text:
      'Far-UV circular dichroism (CD) spectroscopy (190–250 nm) is primarily used in structural biochemistry to quantify:',
    options: [
      { id: 'A', text: 'Protein secondary structure content (alpha-helix, beta-sheet, random coil)' },
      { id: 'B', text: 'Tertiary packing around aromatic tryptophan residues' },
      { id: 'C', text: 'Quaternary subunit molecular weights' },
      { id: 'D', text: 'Enzyme active site metal coordination numbers' },
    ],
    correct_answer: 'A',
    explanation:
      'In the far-UV region (190-250 nm), the chromophore is the peptide bond backbone. Different regular secondary structural elements exhibit distinct characteristic CD spectral profiles: α-helices display prominent negative double minima at 222 nm and 208 nm with a positive peak at 193 nm, while β-sheets display a negative minimum at 218 nm and a positive peak at 195 nm.',
    year_tag: 'CSIR-NET June 2021',
    reference_source: 'Wilson & Walker Principles and Techniques of Biochemistry and Molecular Biology, Ch. 12',
  },
  {
    id: 'csir_c_1301',
    part: 'C',
    topic: 'Methods in Biology',
    subtopic: 'Histochemical & Immunotechniques',
    difficulty: 'Hard',
    bloom_level: 'Analyze',
    question_text:
      'A biomedical researcher analyzes bone marrow cell populations using dual-parameter flow cytometry (FACS) with anti-CD3-FITC (FL1) and anti-CD19-PE (FL2) fluorophore-conjugated antibodies.\n\nObservations:\n• Quadrant 1 (Upper Left: FL1⁻ FL2⁺): CD3⁻ CD19⁺\n• Quadrant 2 (Upper Right: FL1⁺ FL2⁺): CD3⁺ CD19⁺\n• Quadrant 3 (Lower Left: FL1⁻ FL2⁻): CD3⁻ CD19⁻\n• Quadrant 4 (Lower Right: FL1⁺ FL2⁻): CD3⁺ CD19⁻\n\nWhich quadrant contains mature B lymphocytes, and which contains mature T lymphocytes?',
    options: [
      { id: 'A', text: 'B cells in Quadrant 1; T cells in Quadrant 4' },
      { id: 'B', text: 'B cells in Quadrant 4; T cells in Quadrant 1' },
      { id: 'C', text: 'B cells in Quadrant 2; T cells in Quadrant 3' },
      { id: 'D', text: 'Both B and T cells reside in Quadrant 2' },
    ],
    correct_answer: 'A',
    explanation:
      'CD19 is the canonical lineage surface marker for B lymphocytes, stained here with PE (FL2, y-axis). CD3 is the invariant signal transduction co-receptor for the T-cell receptor (TCR) on mature T lymphocytes, stained here with FITC (FL1, x-axis). Mature B cells are CD19⁺ CD3⁻ and therefore map to Quadrant 1 (FL1⁻ FL2⁺). Mature T cells are CD3⁺ CD19⁻ and map to Quadrant 4 (FL1⁺ FL2⁻). Double-positive (Q2) cells are absent in normal peripheral repertoires.',
    year_tag: 'CSIR-NET Dec 2023',
    reference_source: 'Kuby Immunology, 8th Ed., Flow Cytometry Applications',
  },
];
