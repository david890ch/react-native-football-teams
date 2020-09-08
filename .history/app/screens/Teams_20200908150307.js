import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { getTeams } from '../actions/TeamsActions';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { secondaryColor } from '../utils/Colors';
import { generalStyle } from '../utils/Styles';

const Teams = props => {
    const teams = useSelector(state => state.teams.teamsList);
    const isLoading = useSelector(state => state.teams.isLoading);

    useEffect(() => {
        props.getTeams();
    }, []);

    const handleTeamClick = teamId => {
        props.navigation.navigate('Team', {
            id: teamId,
        });
    }

    // const getMoreTeams = () => {
    //     console.log('enter get more');
    // }

    return (
        <View style={styles.container}>
            {isLoading === false && teams.length > 0 ?
                <FlatList
                data={teams}
                showsVerticalScrollIndicator={true}
                keyExtractor={item => item.id.toString()}
                // onEndReached={getMoreTeams}
                // onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.row} onPress={() => { handleTeamClick(item.id) }}>
                        <Text style={[generalStyle.text, styles.name]}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                />
                : <View>
                    <Text>Loading !!!</Text>
                </View>
            }
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        padding: 15,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
        marginTop: 10,
        backgroundColor: secondaryColor,
        opacity: 0.7,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    name: {
        textAlign: 'center'
    }
});

const mapStateToProps = state => ({
    teams: state.teams.teamsList,
    isLoading: state.teams.isLoading,
});

export default connect(mapStateToProps, { getTeams })(Teams);