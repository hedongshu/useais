<script lang="ts" setup>
import { AppConfigInput } from '@nuxt/schema'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { DropdownOption } from 'naive-ui'

export interface IMenuItem {
  type: 'link' | 'button'
  text: string
  href?: any
  route?: any
}

const { t } = useLang()
const app = useAppConfig() as AppConfigInput
const menus = computed((): IMenuItem[] => [
  {
    type: 'link',
    text: t('pages.index.nav'),
    route: { name: 'index' },
  },
  {
    type: 'link',
    text: t('pages.app.nav'),
    route: { name: 'apps' },
  },
  { type: 'link', text: t('pages.faq.nav'), route: { name: 'faq' } },
  {
    type: 'link',
    text: t('pages.about.nav'),
    route: { name: 'about' },
  },

  // { type: 'link', text: t('pages.test.nav'), route: { name: 'test' } },
  // { type: 'link', text: t('pages.post.nav'), route: { name: 'post' } },
  // { type: 'link', text: t('pages.setting.nav'), route: { name: 'setting' } },
  // {
  //   type: 'button',
  //   text: t('pages.dashboard.nav'),
  //   route: { name: 'dashboard' },
  // },
])

const { logout, fetchUser, changePassword } = useAuth()
const { useUser, revokeAllSessions, getAllSessions, revokeSession } =
  useAuthSession()
const user = useUser()
const { data, refresh, error } = await useAsyncData(getAllSessions)

async function handleSelect(key: string, option: DropdownOption) {
  console.log(key, option)
  if (key === 'logout') {
    await logout()
  } else if (key === 'account') {
    return navigateTo('/account')
  } else if (key === 'management') {
    return navigateTo('/management')
  }
}

const login = () => navigateTo('/auth/login')

const useroptions = [
  // {
  //   label: '用户资料',
  //   key: 'profile',
  //   props: {
  //     onClick: () => {
  //       navigateTo('/profile')
  //     },
  //   },
  // },
  // {
  //   label: '修改密码',
  //   key: 'editProfile',
  //   props: {
  //     onClick: () => {
  //       navigateTo('/auth/reset-password')
  //     },
  //   },
  // },
  {
    label: '退出登录',
    key: 'logout',
    props: {
      onClick: () => {
        logout()
      },
    },
  },
]
</script>

<template>
  <BuilderNavbar>
    <template #banner>
      <div
        class="text-white text-xs text-center py-1 px-4 lg:px-8 bg-primary-500 capitalize"
      >
        <span class="mr-1">
          {{ $t('banners.welcome', { app_name: app.name }) }}
          <Anchor
            class="underline font-bold"
            :text="$t('others.learn_more')"
            href=""
          />
        </span>
      </div>
    </template>

    <template #menu>
      <div class="relative hidden lg:flex items-center w-full">
        <nav
          class="w-full text-sm leading-6 font-semibold text-gray-600 dark:text-gray-300"
          role="navigation"
        >
          <ul class="pl-10 flex items-center space-x-8">
            <li v-for="(item, i) in menus" :key="i">
              <Anchor
                v-if="item.type === 'link'"
                :to="item.route ? item.route : undefined"
                :href="item.href ? item.href : undefined"
                class="hover:no-underline hover:text-slate-900 hover:dark:text-white capitalize"
                >{{ item.text }}
              </Anchor>
              <Button
                v-else-if="item.type === 'button'"
                :text="item.text"
                size="xs"
                class="font-extrabold capitalize"
                :to="item.route ? item.route : undefined"
                :href="item.href ? item.href : undefined"
              />
            </li>
          </ul>
        </nav>
        <div
          class="flex space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]"
        >
          <LanguageSwitcher />
          <ThemeSwitcher />
        </div>
        <div
          class="space-x-4 border-l ml-6 pl-6 border-gray-900/10 dark:border-gray-50/[0.2]"
        >
          <n-dropdown
            v-if="user"
            :options="useroptions"
            @on-select="handleSelect"
          >
            <n-button text>{{ user.name }}</n-button>
          </n-dropdown>

          <Button
            v-else
            size="xs"
            :text="$t('auth.login')"
            class="w-15 font-extrabold capitalize"
            @click.prevent="login"
          />
        </div>
      </div>
    </template>

    <template #options="{ toggleOptions }">
      <ActionSheet @on-close="toggleOptions(false)">
        <ActionSheetBody>
          <ActionSheetHeader text="Menu" />
          <nav class="leading-6 font-semibold text-gray-600 dark:text-gray-300">
            <ul class="flex flex-col">
              <li
                v-for="(item, i) in menus"
                :key="i"
                class="flex w-full"
                :class="{
                  'pb-2 mb-2 border-b border-gray-900/10 dark:border-gray-50/[0.2]':
                    item.type === 'link',
                }"
              >
                <Anchor
                  v-if="item.type === 'link'"
                  :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined"
                  class="flex-1 hover:no-underline capitalize"
                  >{{ item.text }}</Anchor
                >
                <Button
                  v-else-if="item.type === 'button'"
                  :text="item.text"
                  size="xs"
                  class="flex-1 font-extrabold capitalize"
                  :to="item.route ? item.route : undefined"
                  :href="item.href ? item.href : undefined"
                />
              </li>
            </ul>
          </nav>

          <div class="mt-6 text-sm font-bold capitalize">
            {{ $t('components.theme_switcher.change_theme') }}
          </div>
          <div class="mt-2">
            <ThemeSwitcher type="select-box" />
          </div>
          <div class="mt-6 text-sm font-bold capitalize">
            {{ $t('components.language_switcher.change_language') }}
          </div>
          <div class="mt-2">
            <LanguageSwitcher type="select-box" />
          </div>
        </ActionSheetBody>

        <Button
          v-if="!user"
          :text="$t('auth.login')"
          type="primary"
          @click.prevent="login"
        />

        <Button
          v-else
          :text="$t('auth.logout')"
          type="primary"
          @click.prevent="logout"
        />

        <Button
          text="Close"
          type="secondary"
          @click.prevent="toggleOptions(false)"
        />
      </ActionSheet>
    </template>
  </BuilderNavbar>
</template>
