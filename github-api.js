// GitHub API — curated featured projects and optional live fetch
// Portfolio uses static project cards; this file provides fallback data and optional API integration.

var CURATED_FEATURED = [
    {
        name: 'ZIRAA',
        description: 'Agritech marketplace platform connecting farmers to markets, with logistics and data-driven workflows.',
        language: 'Python',
        stars: 0,
        forks: 0,
        url: 'https://github.com/Alvin-Ruto',
        topics: ['Django', 'React', 'Docker', 'MongoDB'],
        updated: null,
        homepage: null
    },
    {
        name: 'AES_Encrypted_Messenger',
        description: 'Secure communication tool with AES encryption, OTP verification, and Tkinter UI.',
        language: 'Python',
        stars: 0,
        forks: 0,
        url: 'https://github.com/Alvin-Ruto/AES_Encrypted_Messenger',
        topics: ['Python', 'Cryptography', 'Tkinter'],
        updated: null,
        homepage: null
    },
    {
        name: 'Dairy_Management_System_with_Python_and_Django',
        description: 'Django-based dairy management system with automated milk records and reporting.',
        language: 'Python',
        stars: 0,
        forks: 0,
        url: 'https://github.com/Alvin-Ruto/Dairy_Management_System_with_Python_and_Django',
        topics: ['Django', 'Python', 'Database'],
        updated: null,
        homepage: null
    },
    {
        name: 'AgriTrack 2.0',
        description: 'Dairy management and digital records for cooperatives.',
        language: 'Python',
        stars: 0,
        forks: 0,
        url: 'https://github.com/Alvin-Ruto',
        topics: ['Django', 'Python'],
        updated: null,
        homepage: null
    }
];

// Repo names to prefer when fetching from API (keeps portfolio narrative)
var FEATURED_REPO_NAMES = [
    'ZIRAA',
    'AES_Encrypted_Messenger',
    'Dairy_Management_System_with_Python_and_Django',
    'AgriTrack',
    'BBT4206-Lab-on-ARM-a7',
    'BBT4106-Lab2-DataEngineering-a7'
];

function GitHubAPI(username) {
    this.username = username || 'Alvin-Ruto';
    this.baseURL = 'https://api.github.com';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000;
}

GitHubAPI.prototype.getCachedData = function (key) {
    var cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data;
    }
    return null;
};

GitHubAPI.prototype.setCachedData = function (key, data) {
    this.cache.set(key, { data: data, timestamp: Date.now() });
};

GitHubAPI.prototype.formatRepository = function (repo) {
    return {
        name: repo.name,
        description: repo.description || 'No description available',
        language: repo.language || 'Other',
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        url: repo.html_url,
        topics: repo.topics || [],
        updated: repo.updated_at,
        homepage: repo.homepage || null
    };
};

GitHubAPI.prototype.getFallbackProjects = function () {
    return CURATED_FEATURED.slice(0);
};

// Returns curated featured projects (no API call). Use for intentional portfolio display.
GitHubAPI.prototype.getFeaturedProjects = function () {
    return this.getFallbackProjects();
};

// Fetch repos from API; filter to featured names when possible, else return curated fallback.
GitHubAPI.prototype.fetchRepositories = function () {
    var self = this;
    var cacheKey = 'repos_' + this.username;
    var cached = this.getCachedData(cacheKey);
    if (cached) return Promise.resolve(cached);

    return fetch(this.baseURL + '/users/' + this.username + '/repos?sort=updated&per_page=30', {
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Alvin-Kibet-Ruto-Portfolio'
        }
    })
        .then(function (response) {
            if (!response.ok) throw new Error('GitHub API: ' + response.status);
            return response.json();
        })
        .then(function (repos) {
            var formatted = repos.map(function (r) { return self.formatRepository(r); });
            var featured = formatted.filter(function (r) {
                return FEATURED_REPO_NAMES.some(function (name) {
                    return r.name.indexOf(name) !== -1 || name.indexOf(r.name) !== -1;
                });
            });
            var result = featured.length > 0 ? featured : formatted.slice(0, 6);
            self.setCachedData(cacheKey, result);
            return result;
        })
        .catch(function (err) {
            console.warn('GitHub API:', err.message || err);
            return self.getFallbackProjects();
        });
};

GitHubAPI.prototype.fetchUserProfile = function () {
    var self = this;
    return fetch(this.baseURL + '/users/' + this.username, {
        headers: { 'Accept': 'application/vnd.github.v3+json', 'User-Agent': 'Alvin-Kibet-Ruto-Portfolio' }
    })
        .then(function (res) {
            if (!res.ok) throw new Error('GitHub API: ' + res.status);
            return res.json();
        })
        .then(function (profile) {
            return {
                name: profile.name,
                bio: profile.bio,
                avatar: profile.avatar_url,
                followers: profile.followers,
                following: profile.following,
                publicRepos: profile.public_repos,
                location: profile.location,
                blog: profile.blog,
                company: profile.company
            };
        })
        .catch(function (err) {
            console.warn('GitHub API profile:', err.message || err);
            return null;
        });
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GitHubAPI: GitHubAPI, CURATED_FEATURED: CURATED_FEATURED };
}
