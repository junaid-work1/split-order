import PropTypes from 'prop-types'

const Input = ({ type, name, handleChange, value, error }) => (
  <div>
    {name}
    <input
      type={type}
      id={name}
      className='form-control mb-3'
      name={name}
      value={value}
      onChange={handleChange}
    />
    {error[name] && <p className='text-danger'>{error[name]}</p>}
  </div>
)

export default Input

Input.propTypes = {
  error: PropTypes.object,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string
}
