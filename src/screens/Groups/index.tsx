import { Button } from '@components/Button';
import { GroupCard } from '@components/GroupCard';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { ListEmpty } from '@components/ListEmpty';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Container } from './styles';
import { RootStackParamList } from 'src/routes/app.routes';
import { useNavigation } from '@react-navigation/native';


export function Groups() {

    const [groups, setGroups] = useState<string[]>([])

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    function handleNewGroup() {
        navigation.navigate('new')
    }

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

