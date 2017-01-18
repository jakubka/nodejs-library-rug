/*
 * Copyright © 2016 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CustomizingProjectGenerator, ProjectGenerator } from "@atomist/rug/operations/ProjectGenerator"
import { Status, Result, Parameter } from "@atomist/rug/operations/RugOperation"
import { Project, Pair, File } from '@atomist/rug/model/Core'
import { PathExpression, PathExpressionEngine, TreeNode, Match } from '@atomist/rug/tree/PathExpression'


// interface Parameters {
//     project_name: string
//     description: string
// }

class NewNodeJsLibraryGenerator extends CustomizingProjectGenerator {
    name: "New"
    description: "123"
    parameters: [
        {
            name: "project_name",
            displayName: "Library Name",
            description: "Name of the library as it's gonna appear on NPM",
            validInput: "Lowercase characters and dashes",
            minLength: 3,
            maxLength: 100,
            pattern: "^[\-a-z]+$",
            required: true
        },
        {
            name: "description",
            displayName: "Description",
            description: "Short description of the purpose of the library",
            validInput: "Lowercase characters and dashes",
            minLength: 3,
            maxLength: 1000,
            pattern: "^.*$",
            required: true
        }
    ]
    tags: ["nodejs", "library", "rug"]
    customize(project: Project, projectName: string, params: string[]): void {
        project.deleteFile("LICENSE");

        project.merge("readme.vm", "README.yml", {
            library_name: projectName,
            description: params['description'],
        });
    }
}

// let editor: ProjectEditor = {
//     tags: ["nodejs", "mshell"],
//     name: "New",
//     description: "Creates new Node.js library project",
//     parameters: params,
//     edit(project: Project, p: Parameters): Result {

//         if (project.directoryExists(".atomist")) {
//             project.merge("travis.yml-rug.vm", ".travis.yml", { "maven_base_url": p.maven_base_url });

//             let travisBuild: string = "travis-build.bash";
//             project.deleteFile(travisBuild);
//             let buildDir: string = ".atomist/build";
//             project.addDirectoryAndIntermediates(buildDir);
//             project.merge(travisBuild + "-rug.vm", buildDir + "/" + travisBuild, {});
//             for (let f of ["cli-build.yml", "cli-release.yml", "cli-dev.yml"]) {
//                 project.merge(f + ".vm", buildDir + "/" + f, {});
//             }

//             var pe = new PathExpression<Project, Travis>(`/Travis()`);
//             let t: Travis = eng.scalar(project, pe);
//             t.enable(p.repo_slug, p.github_token, p.org);
//             t.encrypt(p.repo_slug, p.github_token, p.org, "GITHUB_TOKEN=" + p.github_token);
//             t.encrypt(p.repo_slug, p.github_token, p.org, "MAVEN_USER=" + p.maven_user);
//             t.encrypt(p.repo_slug, p.github_token, p.org, "MAVEN_TOKEN=" + p.maven_token);

//             return new Result(Status.Success, "Repository enabled on Travis CI")
//         } else {
//             return new Result(Status.NoChange, "Repository does not contain a Rug Archive")
//         }
//     }
// }

export let generator: ProjectGenerator = new NewNodeJsLibraryGenerator();
