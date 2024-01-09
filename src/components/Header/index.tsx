import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Container, Logo, BackButton, BackIcon } from "./styles";
import logoImg from '@assets/logo.png'
import { RootStackParamList } from "src/routes/app.routes";


type Props = {
    showBackButton?: boolean;
}


export function Header({ showBackButton = false }: Props) {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
    function handleGoBack() {

        navigation.navigate('groups')
    }
    return (
        <Container>
            {
                showBackButton &&
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={logoImg} />
        </Container>
    )
}