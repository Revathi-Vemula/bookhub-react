import React from 'react'

const StatusContext = React.createContext({
  activeTab: 'Home',
  changeTab: () => {},
})

export default StatusContext
