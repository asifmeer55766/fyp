export function normalizeRequirements(response) {
  let functionalRequirements = [];
  let nonFunctionalRequirements = [];

  if (!response || typeof response !== "object") {
    return { functionalRequirements, nonFunctionalRequirements };
  }

  // Format 1: Object with `functionalRequirements` and `nonFunctionalRequirements`
  if (
    Array.isArray(response.functionalRequirements) ||
    Array.isArray(response.nonFunctionalRequirements)
  ) {
    functionalRequirements = response.functionalRequirements || [];
    nonFunctionalRequirements = response.nonFunctionalRequirements || [];
  }

  // Format 2: Snake_case format
  else if (
    Array.isArray(response.functional_requirements) ||
    Array.isArray(response.non_functional_requirements)
  ) {
    functionalRequirements = response.functional_requirements || [];
    nonFunctionalRequirements = response.non_functional_requirements || [];
  }

  // Format 3: Root-level array or wrapped in data
  else if (response.data) {
    const data = response.data;

    if (
      Array.isArray(data.functionalRequirements) ||
      Array.isArray(data.nonFunctionalRequirements)
    ) {
      functionalRequirements = data.functionalRequirements || [];
      nonFunctionalRequirements = data.nonFunctionalRequirements || [];
    } else if (
      Array.isArray(data.functional_requirements) ||
      Array.isArray(data.non_functional_requirements)
    ) {
      functionalRequirements = data.functional_requirements || [];
      nonFunctionalRequirements = data.non_functional_requirements || [];
    }
  }

  return {
    functionalRequirements: functionalRequirements.filter(Boolean),
    nonFunctionalRequirements: nonFunctionalRequirements.filter(Boolean),
  };
}
