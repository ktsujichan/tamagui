import { H1, ScrollView, Separator, Spacer, YGroup, YStack } from 'tamagui'
import { createParam } from 'solito'
import * as sections from '@tamagui/bento'
import { useLayoutEffect } from 'react'
import { LinkListItem } from '../home/screen'

const { useParam } = createParam<{ id: string }>()
export function BentoPartScreenItem({ navigation }) {
  const [id] = useParam('id')
  const name = id!
    .split('-')
    .map((segment) => {
      return segment[0].toUpperCase() + segment.slice(1)
    })
    .join('')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: name,
    })
  }, [name, navigation])

  const removeComponentsThatAreNotPublic = (component: any) =>
    ![
      'AvatarWithTitle',
      'CircularAvatars',
      'VerticalCheckboxes',
      'useMouseEnter',
    ].includes(component.name)

  return (
    <ScrollView>
      <YStack bg="$color2" p="$3" pt="$6" pb="$8" f={1} space>
        <YGroup size="$4" separator={<Separator />}>
          {Object.values(sections[name] ?? [])
            .filter(removeComponentsThatAreNotPublic)
            .map((Component: any, index) => {
              return (
                <YGroup.Item key={Component.name}>
                  <LinkListItem
                    bg="$color1"
                    href={'/' + Component.name}
                    pressTheme
                    size="$4"
                  >
                    {Component.name}
                  </LinkListItem>
                </YGroup.Item>
              )
            })}
        </YGroup>
      </YStack>
    </ScrollView>
  )
}
