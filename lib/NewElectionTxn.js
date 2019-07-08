
/**
 * Vote transaction
 * @param {org.evotedapp.biznet.NewElectionTransaction} election
 * @transaction
 */
async function newElection(election) {


        var factory = getFactory();
        var namespace = "org.evotedapp.biznet";

        var newElection = factory.newResource(namespace, "Election", election.name+"_"+election.startDateTime);
        newElection.name = election.name;
        newElection.startDateTime = election.startDateTime;
        newElection.endDateTime = election.endDateTime;
        newElection.candidates = election.candidates;
        newElection.electionStatus = "Created";
        newElection.commissioner = election.commissioner;

        return getAssetRegistry(newElection.getFullyQualifiedType())
                .then(registry => {
                    var electionRegistry = registry.add(newElection);
                    return electionRegistry
                })
                .then(() => {
                    var electionEvent = factory.newEvent(namespace, "NewElectionNotification");
                    electionEvent.election = newElection;
                    emit(electionEvent);
                });
    
        

    
}