<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/app">{{ $t('project.name') }}</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/pet">{{ $t('pet') }}</b-nav-item>
          <b-nav-item to="/post">{{ $t('post') }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-avatar></b-avatar>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">{{ $t('profile') }}</b-dropdown-item>
            <b-dropdown-item href="#">{{ $t('logout') }}</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
