import React, { useContext } from 'react'

import { View, Text, FlatList, Alert } from 'react-native'
import { ListItem, Avatar, Button, Icon } from '@rneui/themed'
import UsersContext from '../context/UsersContext'

export default props => {
  const { state, dispatch } = useContext(UsersContext)
  

  const confirmUserDeletion = user => {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          dispatch({ type: 'deleteUser', payload: user })
        }
      },
      {
        text: 'Não'
      }
    ])
  }

  const getActions = user => {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </>
    )
  }

  const getUserItem = ({ item: user }) => {
    return (
      <ListItem
        key={user => user.id.toString()}
        onPress={() => props.navigation.navigate('UserForm')}
        bottomDivider
      >
        <Avatar source={{ uri: user.avatarUrl }} />

        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            flexGrow: 0.3
          }}
        >
          {getActions(user)}
        </ListItem.Content>
      </ListItem>
    )
  }

  return (
    <View>
      <FlatList
        keyExtractor={user => user.id.toString()}
        data={state.users}
        renderItem={getUserItem}
      />
    </View>
  )
}
