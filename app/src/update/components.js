
export const updateComponents = (parts) => {
  const { components } = parts
  components.forEach(c => c.update(parts))
}