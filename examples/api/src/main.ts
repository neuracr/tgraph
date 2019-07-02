import { Graph, GraphOptions, GraphNode, GraphView, NodeMesh, GraphEdge } from "../../../lib/index";
import * as $ from "jquery";

const graphSelector = '#graph';
const descriptionSelector = '#description';
const usernameSelector = '#searchValue';

const graphOpt = new GraphOptions();
const graphView = new GraphView(graphSelector, graphOpt);

const MAX_NODES = 500;

var users = new Map<string, GraphNode>();
var repos = new Map<string, GraphNode>();
var edges = new Array<GraphEdge>();

var users_to_explore = new Array<string>();
var repos_to_explore = new Array<string>();


graphOpt.onExitHover = (node: NodeMesh): void => {
    $(descriptionSelector).empty();
    $(descriptionSelector).hide();
}

graphOpt.onEnterHover = (node: NodeMesh): void => {
    $(descriptionSelector).html(`<p><b>${node.name}</b></p><br><p>${node.label}</p>`);
    $(descriptionSelector).show();
}


export function search() {
    let username = $(usernameSelector).val.toString();



    // TODO
    let nodes = new Array<GraphNode>();
    let edges = new Array<GraphEdge>();
    let graph = new Graph(nodes, edges, false);
    graphView.draw(graph);
}

function popsearch(username) {
    users_to_explore = [username];
    repos_to_explore = [];
    while ((users_to_explore.length > 0) ||
        (repos_to_explore.length > 0) &&
        (users.keys.length + repos.keys.length) < MAX_NODES) {
        if (users_to_explore.length > 0) {
            userInfos(users_to_explore.shift());
        }
        if (repos_to_explore.length > 0) {
            repoInfos(users_to_explore.shift());
        }
    }
}

function userInfos(user) {
    let userInformation: any = $.get(`https://api.github.com/users/${user}`);
    users[user] = new GraphNode(user);

    let following: any = $.get(`https://api.github.com/users/${user}/following`);
    let repos: any = $.get(`https://api.github.com/users/${user}/repos`);

    following.forEach(element => {
        users_to_explore.push(element.login);
        edges.push(new GraphEdge(user, element.login));
    });

    repos.forEach(element => {
        users_to_explore.push(element.full_name);
        edges.push(new GraphEdge(user, element.full_name));
    });

}

function repoInfos(repo) {
    let repoInformation: any = $.get(`https://api.github.com/repos/${repo}`)
    repos[repo] = new GraphNode(repo);

    let collaborators: any = $.get(`https://api.github.com/repos/${repo}/collaborators`)
    
    collaborators.forEach(element => {
        users_to_explore.push(element.login)
    });
}




