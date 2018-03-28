import React, {Component} from 'react';
import {connect} from 'dva';
import ScrollBar from 'react-custom-scrollbars';
import styles from './ItemList.less';
import Item from '../Item/Item'

function mapStateToProps(state) {
  const {list, autoResize, pageWidth, pageHeight, style,} = state.item;
  return {
    list,
    autoResize,
    pageWidth,
    pageHeight,
    style,
  };
}

const ItemList = ({dispatch, list, autoResize, pageWidth, pageHeight, style, isEdit}) => {

  const {clientWidth: listWidth} = document.getElementById('listContainer') || {}
  const ratio = listWidth ? listWidth / pageWidth : 1

  const onMouseDown = (e) => {
    e.stopPropagation()
    dispatch({
      type: 'item/setActiveItemId',
      payload: ''
    })
  }

  const getItemList = (list, parentId) => {

    let itemList = []
    list.map(item => {
        if (item.parentId === parentId) {
          itemList.push(<Item
            key={item.id}
            item={item}
            isEdit={isEdit}
          >
            {
              getItemList(list, item.id)
            }
          </Item>)
        }
      }
    )

    return itemList
  }

  return <ScrollBar onMouseDown={onMouseDown} id="listContainer">
    <div style={{
      overflow: 'hidden',
      margin: '0 auto',
      position: 'relative',
      width: !isEdit && autoResize ? listWidth : pageWidth,
      height: !isEdit && autoResize ? (pageHeight * ratio || 100 * ratio + '%') : (pageHeight || '100%'),
    }}>
      <Item item={{
        id: 'list',
        parentId: null,
        y: 0,
        x: 0,
        width: pageWidth,
        height: pageHeight || '100%',
        type: 'container',
        style: {
          ...style,
          transform: !isEdit && autoResize ? `scale(${ratio})` : '',
          transformOrigin: '0 0',
        },
        eventList: [],
      }}
            isEdit={false}
            className={styles.content}
      >
        {
          getItemList(list, 'list')
        }
      </Item>
    </div>
  </ScrollBar>
}

export default connect(mapStateToProps)(ItemList)
