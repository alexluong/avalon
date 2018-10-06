import React from "react"

const isProd = process.env.NODE_ENV === "production"
const NameContext = React.createContext({})

class NameProvider extends React.Component {
  state = {
    name: this.getNameFromLS(),
  }

  getNameFromLS() {
    if (isProd) {
      const name = localStorage.getItem("name")
      if (name === null) {
        return undefined
      }
      return name
    } else {
      return undefined
    }
  }

  setName = name => {
    if (isProd) localStorage.setItem("name", name)
    this.setState({ name })
  }

  render() {
    return (
      <NameContext.Provider
        value={{ name: this.state.name, setName: this.setName }}
      >
        {this.props.children}
      </NameContext.Provider>
    )
  }
}

const withName = Component => props => (
  <NameContext.Consumer>
    {nameProps => <Component {...props} {...nameProps} />}
  </NameContext.Consumer>
)

export { NameProvider, withName }
export default NameContext
