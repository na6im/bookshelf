# Context

## Background

Once we've got all our server cache state inside `react-query`, there's not a
whole lot of global state left in our application that can't be easily managed
via a combination of React state, composition, and lifting state.

That said, there are definitely still scenarios where having some UI state
that's globally available through context would be valuable. Things like
application "toast" notifications, user authentication state, or modal and focus
management can all benefit from the coordination and freedom from
[Prop Drilling](https://kentcdodds.com/blog/prop-drilling) that a single global
provider could provide.

📜 For a refresher on the APIs we'll be using:

- https://reactjs.org/docs/hooks-reference.html#usecontext

## Exercise

In this exercise, rather than passing the `user` object and the `login`,
`register`, and `logout` functions as props to the `AuthenticatedApp` and the
`UnauthenticatedApp`, we're going to put those values in an
`AuthContext.Provider` value and then those components will get the things they
need from context.

### Files

- `/src/context/auth-context.js`
- `/src/app.js`
- `/src/authenticated-app.js`
- `/src/unauthenticated-app.js`

## Extra Credit

### 1. 💯 create an AuthProvider

Rendering providers in regular application code is fine, but one nice way to
create a logical separation of concerns (which will help with maintainability)
is to create a component who's sole purpose is to manage and provide the
authentication state. So for this extra credit, you need to create an
`AuthProvider` component. Most of the code for this component will be moved from
the `./src/app.js` module and you'll move it to the
`./src/context/auth-context.js` module.

In that module, create an `AuthProvider` component that renders the
`AuthContext.Provider` Copy most of the code from the `App` component in the
`./src/app.js` module and make sure that the `value` you pass to the provider
is: `{user, login, register, logout}`

Also, create a `useAuth` custom hook that consumes the `AuthContext` from
`React.useContext`. This can be as simple as
`const useAuth = () => React.useContext(AuthContext)` but if you want to add a
little extra protection to ensure people only use it within an AuthProvider then
you can do that.

Don't forget to export the AuthProvider component and useAuth hook and you don't
need to export the `AuthContext` anymore.

**Files:**

- `/src/context/auth-context.js`
- `/src/app.js`
- `/src/index.js` (this is where you'll render the `AuthProvider`)
- `/src/authenticated-app.js`
- `/src/unauthenticated-app.js`

### 2. 💯 colocate global providers

Typically in applications, you'll have several context providers that are global
or near-global. Most of the time, it's harmless to just make them all global and
create a single provider component that brings them all together. In addition to
general "cleanup", this can help make testing easier.

Inside the `./src/context/index.js` module create an `AppProviders` component
that:

- accepts a `children` prop
- renders all the context providers for our app:
  - `ReactQueryConfigProvider` <-- get that from the `src/index.js` module
  - `Router` <-- get that from the `src/app.js` module
  - `AuthProvider` <-- you should have created that in
    `src/context/auth-context.js`
- Pass the children along to the last provider

💰 Here's how it'll look:

```javascript
function AppProviders({children}) {
  return (
    <Provider1>
      <Provider2>
        <Provider3>{children}</Provider3>
      </Provider2>
    </Provider1>
  )
}
```

Don't forget to `export {AppProviders}`

**Files:**

- `src/index.js`
- `src/context/index.js`

## 🦉 Elaboration and Feedback

After the instruction, if you want to remember what you've just learned, then
fill out the elaboration and feedback form:

https://ws.kcd.im/?ws=Build%20React%20Apps%20%F0%9F%93%98&e=07%3A%20Context&em=
