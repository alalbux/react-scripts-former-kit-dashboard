import React, { Component } from 'react'
import {
  arrayOf,
  bool,
  func,
  number,
  object,
} from 'prop-types'

import {
  compose,
  defaultTo,
  equals,
  is,
  path,
  pipe,
  reverse,
  sortBy,
  toLower,
  when,
} from 'ramda'

import {
  Button,
  Dropdown,
  Pagination,

  Card,
  CardContent,
  CardSection,
  CardTitle,

  Table,
} from 'former-kit'

import IconAdd24 from 'emblematic-icons/svg/Add24.svg'

import style from './style.css'

const isAscending = equals('ascending')

const rowSort = accessor =>
  sortBy(compose(when(is(String), toLower), defaultTo(''), path(accessor)))

const buildSorter = (accessor, order) => (
  isAscending(order) ?
    rowSort(accessor) :
    pipe(rowSort(accessor), reverse)
)

const sortByOrderColumn = (rows, columns, orderColumn, order) => {
  const referenceColumn = columns[orderColumn]
  const referenceAccessor = referenceColumn.accessor
  const sort = buildSorter(referenceAccessor, order)
  return sort(rows)
}

class TableContainer extends Component {
  constructor (props) {
    super(props)

    const {
      columns,
      rows,
    } = this.props

    this.state = {
      columns,
      expandedRows: [],
      order: 'ascending',
      orderColumn: 0,
      rows,
      selectedRows: [],
    }

    this.handleExpandRow = this.handleExpandRow.bind(this)
    this.handleOrderChange = this.handleOrderChange.bind(this)
    this.handleSelectRow = this.handleSelectRow.bind(this)
  }

  handleOrderChange (index, order) {
    const { columns, rows } = this.state
    const sortedRows = sortByOrderColumn(rows, columns, index, order)
    this.setState({
      order,
      orderColumn: index,
      rows: sortedRows,
    })
  }

  handleSelectRow (selectedRows) {
    this.setState({
      selectedRows,
    })
  }

  handleExpandRow (expandedRows) {
    this.setState({
      expandedRows,
    })
  }

  render () {
    const {
      expandable,
      maxColumns,
      onRowClick,
      selectable,
    } = this.props

    const {
      columns,
      expandedRows,
      order,
      orderColumn,
      rows,
      selectedRows,
    } = this.state

    return (
      <Card>
        <CardTitle title="Table sample" />
        <CardContent>
          <CardSection
            title="Selectable and expandable rows"
            subTitle="It's an awesome table component!"
          >
            <div className={style.buttons}>
              <Button
                relevance="low"
                fill="outline"
                icon={<IconAdd24 width="12px" height="12px" />}
              >
                Click me
              </Button>
              <Button
                relevance="low"
                fill="outline"
                icon={<IconAdd24 width="12px" height="12px" />}
              >
                Click me
              </Button>
              <Button
                relevance="low"
                fill="outline"
                icon={<IconAdd24 width="12px" height="12px" />}
              >
                Click me
              </Button>
              <span />
              <Dropdown
                options={[10, 20, 30, 40, 50].map(i =>
                  ({ name: `${i} items per page`, value: i }))
                }
                name="count"
                value={this.state.selected}
                placeholder="Items per page"
                onChange={() => undefined}
              />
              <Pagination
                currentPage={1}
                totalPages={128}
                onPageChange={() => undefined}
              />
            </div>
            <Table
              className={style.table}
              columns={columns}
              rows={rows}
              selectable={selectable}
              expandable={expandable}
              selectedRows={selectedRows}
              expandedRows={expandedRows}
              maxColumns={maxColumns}
              onOrderChange={this.handleOrderChange}
              onSelectRow={this.handleSelectRow}
              orderSequence={order}
              orderColumn={orderColumn}
              onExpandRow={this.handleExpandRow}
              onRowClick={onRowClick}
            />
          </CardSection>
        </CardContent>
      </Card>
    )
  }
}

TableContainer.propTypes = {
  columns: arrayOf(object), // eslint-disable-line
  expandable: bool,
  maxColumns: number,
  onRowClick: func,
  rows: arrayOf(object), // eslint-disable-line
  selectable: bool,
}

TableContainer.defaultProps = {
  columns: [],
  expandable: false,
  maxColumns: 7,
  onRowClick: () => undefined,
  rows: [],
  selectable: false,
}

export default TableContainer
