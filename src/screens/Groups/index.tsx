import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { groupsGetAll } from '@storage/group/groups-get-all';
import { useCallback, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import { RootStackParamList } from 'src/routes/app.routes';

import { Container } from './styles';

export function Groups() {

    const [groups, setGroups] = useState<string[]>([])

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    function handleNewGroup() {
        navigation.navigate('new')
    }

    async function fetchGroups() {
        try {
            const data = await groupsGetAll()
            setGroups(data)
        } catch (error) {
            Alert.alert('Turmas', 'Não foi possível carregar as turmas')
        }
    }

    function handleOpenGroup(group: string) {
        navigation.navigate('players', { group })
    }

    useFocusEffect(useCallback(() => {
        fetchGroups()
    }, []))

    return (
        <Container>
            <Header />
            <Highlight
                title='Turmas'
                subtitle='Jogue com a sua turma'
            />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <GroupCard
                        title={item}
                        onPress={() => handleOpenGroup(item)}
                    />
                )}
                contentContainerStyle={!groups.length && { flex: 1 }}
                ListEmptyComponent={() => (
                    <ListEmpty
                        message='Que tal cadastrar a primeira turma?'
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
            <Button
                title='Criar nova turma'
                onPress={handleNewGroup}
            />
        </Container>
    );
}

