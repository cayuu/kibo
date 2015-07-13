
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
    {pre: [{label: 'Caps Lock', fn: 'caps'}], post: [{label: 'Return'}]},
    {pre: [{label: 'Shift', fn: 'shift'}], post: [{label: 'Shift', fn: 'shift'}]},
    {mid: [{label: 'Space'}]}
  ]
}

export default class Kibo extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      isCapsed: false,
      isShifted: false,
      target: this.props.children ? this.props.children : this.props.target,
      value: this.props.text || '',
      visible: this.props.visible || false
    }
  }

  backspace () {
    let val = this.state.value
    this.setState({value: val.substr(0, val.length - 1)})
  }

  drawSpecial (source) {
    return source.map(key => {
      return (
        <div
          key={key}
          className='kibo-key kibo-special'
          onMouseDown={e => {
            e.preventDefault()
            React.findDOMNode(this.refs.input).focus()
          }}
          onClick={() => key.fn ? this[key.fn](key) : null}>
          {key.label}
        </div>
      )
    })
  }

  onPress (key) {
    this.setState({value: this.state.value += key})

    // De-shift after a keypress
    if (this.state.isShifted) this.shift()
  }

  caps () {
    this.setState({isCapsed: !this.state.isCapsed})
  }

  shift () {
    this.setState({isShifted: !this.state.isShifted})
  }

  render () {
    const src = this.state.isShifted || this.state.isCapsed
      ? layout.shift
      : layout.normal

    const styles = {
      display: this.state.visible ? 'block' : 'none'
    }

    return (
      <span className='kibo-wrapper'>

        {React.cloneElement(this.state.target, {
            onChange: () => {},
            onFocus: () => this.setState({visible: true}),
            onBlur: () => this.setState({visible: false}),
            ref: 'input',
            value: this.state.value
          })}

        <div className='kibo' style={styles}>
          {src.map((str, row) => {
            return (
              <div
                key={row}
                className='kibo-row'
                onMouseDown={e => { e.preventDefault(); React.findDOMNode(this.refs.input).focus() }}>

                {layout.special[row].pre &&
                  this.drawSpecial(layout.special[row].pre)}

                {str.split('').map(key => {
                  return (
                    <div
                      className={'kibo-key' + (key === ' ' ? ' kibo-space' : '')}
                      dataKey={key}
                      key={key}
                      onClick={() => this.onPress(key)} >
                      {key}
                    </div>
                  )
                })}

                {layout.special[row].post && this.drawSpecial(layout.special[row].post)}
              </div>
            )
          })}

        </div>
      </span>
    )
  }

}

Kibo.propTypes = {
  children: React.PropTypes.any,
  target: React.PropTypes.any,
  text: React.PropTypes.string,
  visible: React.PropTypes.bool
}
