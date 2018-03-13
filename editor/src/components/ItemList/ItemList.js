import React, {Component} from 'react';
import {connect} from 'dva';
import styles from './ItemList.less';
import Item from '../Item/Item'

function mapStateToProps(state) {
  const {list, activeItemId, hoverItem, dragItem} = state.item;
  return {
    loading: state.loading.models.item,
    list,
    activeItemId,
    hoverItem,
    dragItem,
  };
}

const ItemList = ({dispatch, loading, list, activeItemId, hoverItem, dragItem}) => {

  const onMouseDown = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'item/setActiveItemId',
      payload: ''
    })
  }

  const getItemList = (list, parentId) => {

    const filterItemList = list.filter(item => item.parentId === parentId)

    return filterItemList.length ? filterItemList.map(item => <Item
        key={item.id}
        item={item}
        list={list}
        dispatch={dispatch}
        activeItemId={activeItemId}
        hoverItem={hoverItem}
        dragItem={dragItem}
      >
        {
          getItemList(list, item.id)
        }
      </Item>
    ) : undefined
  }

  return <div className={styles.body} onMouseDown={onMouseDown}>
    <Item item={{
      id: '',
      parentId: null,
      y: 0,
      x: 0,
      width: '100%',
      height: '100%',
      type: 'container',
      style: {
        background: 'transparent',
        border: 0,
      }
    }}
          className={styles.content}
          list={list}
          dispatch={dispatch}
          activeItemId={activeItemId}
          hoverItem={hoverItem}
          dragItem={dragItem}
          extendsProps={{
            disableDragging: true,
            enableResizing: false,
          }}
    >
      {
        getItemList(list, '')
      }
    </Item>
  </div>
}

export default connect(mapStateToProps)(ItemList)
