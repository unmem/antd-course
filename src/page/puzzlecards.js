import React, { Component } from 'react'
import { Card, Button } from 'antd'
import { connect } from 'dva'

const namespace = 'puzzlecards'

const getCardList = state => state[namespace].data

const mapStateToProps = state => ({
  cardList: getCardList(state),
})

const mapDispatchToProps = dispatch => {
  return {
    onClickAdd: newCard => {
      const action = {
        type: `${namespace}/addNewCard`,
        payload: newCard,
      }
      dispatch(action)
    },
    onDidMount: () => {
      dispatch({
        type: `${namespace}/queryInitCards`,
      })
    },
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class PuzzleCardsPage extends Component {
  componentDidMount() {
    this.props.onDidMount()
  }

  render() {
    const { cardList, onClickAdd } = this.props

    return (
      <div>
        {cardList.map(card => {
          return (
            <Card key={card.id}>
              <div>Q: {card.setup}</div>
              <div>
                <strong>A: {card.punchline}</strong>
              </div>
            </Card>
          )
        })}
        <div>
          <Button
            onClick={() =>
              onClickAdd({
                setup:
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                punchline: 'here we use dva',
              })
            }
          >
            添加卡片
          </Button>
        </div>
      </div>
    )
  }
}

export default PuzzleCardsPage
