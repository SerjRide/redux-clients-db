
renderRow = () => {
  const { col, method } = this.state;
  const { orders } = this.props.state;
  let items;

  items = orders.map((item) => {
    return (
      <tr key={ item._id }
        onDoubleClick= { () => this.props.showModal(item._id) }>
        <th>{ item.namber }</th>
        <td>{ item.customer }</td>
        <td>{ item.date }</td>
        <td>{ item.name }</td>
        <td>{ item.contacts }</td>
        <td>{ getProductsNames(item) }</td>
        <td>{ item.price }</td>
      </tr>
    )
  });

  return items;
}
