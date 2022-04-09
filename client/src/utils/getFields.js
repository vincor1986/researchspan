const getFields = (subject) => {
  switch (subject.toLowerCase()) {
    case "physics":
      return [
        "Thermodynamics",
        "Statistical Mechanics",
        "Electromagnetism",
        "Photonics",
        "Relativistic Mechanics",
        "Quantum Mechanics",
        "Molecular Physics",
        "Atomic Physics",
        "Optics",
        "Acoustics",
        "Condensed Matter Physics",
        "Nucleur Physics",
        "Cosmology",
      ];
    case "mathematics":
      return [
        "Algebra",
        "Geometry",
        "Differential Equations",
        "Applied Analysis",
        "Mathematical Biology",
        "Mathematical Finance",
        "Numerical Analysis",
        "Scientific Computing",
        "Topology",
        "Differential Geometry",
      ];
    case "computer science":
      return [
        "Architectures",
        "Bioinformatics",
        "Data Mining",
        "Immersive Computing",
        "High Performance Computing",
        "Human Computer Interaction",
        "Networks & Distributed Systems",
        "Robotics & AI",
        "Software Engineering",
      ];
    case "biology":
      return [
        "Biochemistry",
        "Cancer Biology",
        "Cell Biology",
        "Computational Biology",
        "Genetics",
        "Human Disease",
        "Immunology",
        "Developmental Biology",
        "Neurobiology",
        "Microbiology",
      ];
    case "finance":
      return [
        "Corporate Finance",
        "Financial Economics",
        "Asset Pricing",
        "Capital Markets",
        "Banking",
        "Fintech",
      ];
    case "statistics":
      return [
        "Statistical Genetics",
        "Biostatistics",
        "Cheminformatics",
        "Computational Toxicology",
        "Computational Statistics",
        "Functional Data Analysis",
        "High-Dimensional Data",
        "Machine Learning",
        "Sports Statistics",
        "Statistics Education",
      ];
    case "electrical engineering":
      return [
        "Energy",
        "Climate",
        "Machines",
        "Intelligent Systems",
        "Marine Energy",
        "Power Systems",
        "Biomedical Electronics",
        "Neural Microsystems",
      ];
    case "economics":
      return [
        "Decision Theory",
        "Development Economics",
        "Applied Microeconomics",
        "Econometrics",
        "Environmental Economics",
        "Game Theory",
        "Health Economics",
        "International Trade",
        "Macroeconomics",
      ];
  }
};

export default getFields;
