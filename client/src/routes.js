import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {MainPage} from './pages/MainPage'
import {CreateRoom} from './pages/CreateRoom'
import {NoteRoom} from './pages/NoteRoom'
import {AuthPage} from './pages/AuthPage'


export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/main_page">
                    <MainPage />
                </Route>
                <Route path="/create_room">
                    <CreateRoom />
                </Route>
                <Route path="/note_room/:id">
                    <NoteRoom />
                </Route>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}