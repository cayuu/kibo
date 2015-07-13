
import React from 'react'

const layout = {
  normal: [
    '`1234567890-=',
    'qwertyuiop[]\\',
    'asdfghjkl;\'',
    'zxcvbnm,./',
    ' '
  ],
  shift: [
    '~!@#$%^&*()_+',
    'QWERTYUIOP{}|',
    'ASDFGHJKL:"',
    'ZXCVBNM<>?',
    ' '
  ],
  special: [
    {post: [{label: 'Delete', fn: 'backspace'}]},
    {pre: [{label: 'Tab'}]},
    {pre: [{label: 'Caps Lock'}], post: [{label: 'Return'}]},
    {pre: [{label: 'Shift', fn: 'shift'}], post: [{label: 'Shift', fn: 'shift'}]},
    {mid: [{label: 'Space'}]}
  ]
}

export default class Kibo extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      isShifted: false
    }
  }

  backspace () {
    let val = this.props.target.value
    this.props.target.value = val.substr(0, val.length - 1)
  }

  onPress (key) {
    this.props.target.value += key
  }

  shift () {
    this.setState({isShifted: !this.state.isShifted})
  }

  render () {
    const src = this.state.isShifted ? layout.shift : layout.normal

    return (
      <div className='kibo'>
        {src.map((str, row) => {
          return (
            <div key={row} className='kibo-row'>

              {layout.special[row].pre && layout.special[row].pre.map(key => {
                return (
                  <div
                    key={key}
                    className='kibo-key kibo-special'>
                    {key.label}
                  </div>
                )
              })}

              {str.split('').map(key => {
                return (
                  <div
                    className='kibo-key'
                    dataKey={key}
                    key={key}
                    onMouseDown={e => { e.preventDefault(); e.stopPropagation(); this.props.target.focus() }}
                    onClick={e => {
                      this.onPress(key)
                      console.log('pressed', key)
                    }}>
                    {key}
                  </div>
                )
              })}

              {layout.special[row].post && layout.special[row].post.map(key => {
                return (
                  <div
                    key={key}
                    className='kibo-key kibo-special'
                    onMouseDown={e => { e.preventDefault(); this.props.target.focus() }}
                    onClick={() => key.fn ? this[key.fn](key) : this.onPress(key)}>
                    {key.label}
                  </div>
                )
              })}
            </div>
          )
        })}

      </div>
    )
  }

}

Kibo.propTypes = {
  target: React.PropTypes.any.isRequired
}
