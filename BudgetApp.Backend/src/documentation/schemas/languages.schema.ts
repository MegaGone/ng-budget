import { OpenAPIV3 } from 'openapi-types';

export const LanguagesSchema: OpenAPIV3.SchemaObject = {
    type: 'object',
    required: ["responseStatus", "languages"],
    properties: {
        responseStatus: {
            type: "integer",
            example: 200,
            title: "status"
        },
        languages: {
            type: "array",
            items: {
                type: 'object',
                required: ["country", "flag", "lang"],
                properties: {
                    country: { type: 'string', example: "Guatemala" },
                    lang: { type: 'string', example: "es-GT" },
                    flag: { type: 'string', example: "data:image/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAUCAIAAAAVyRqTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAxJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjBFNzZFNDExNzdCMTFFMjg2N0NBQTkxQkM5RjY5Q0YiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjBFNzZFNDAxNzdCMTFFMjg2N0NBQTkxQkM5RjY5Q0YiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiBNYWNpbnRvc2giPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0iODBCNDU1NDY3QzIxOTc2OTNGMUNENjM0NTMwOTgyQkUiIHN0UmVmOmRvY3VtZW50SUQ9IjgwQjQ1NTQ2N0MyMTk3NjkzRjFDRDYzNDUzMDk4MkJFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+T8VYKgAAAklJREFUeNpidF77kOn/v3+MjAxIgJHh/4Mv/0NV2NuspBhwgwNPPubsfyPKxcKMohuk/T8jAxMDw/9/jOh6/jMwMjH8Y/zPQAgwMv7/hykK1sfI8p/xL+N/JigXSRYizUAYMGLoBbv6P9Bx/4nRTxqAWMVEnNPQtREDiDL6719QgG44dfjAtQuMIO7ff//+EWE0I06zmZiAFjPMWbdg5rqFQMbreydyasN+/GO4cuNK7ZQ2oAg7GxvuGPjPhMeD3JxcDAx/lu5YziMg//nutFSbXU1RgqktZb+ZWLcf33rn8hFhQQ5cMQsMORY8PhLg4T1yYjMjK3OcqxMDg+L7PTeC+NRYnKR+Mf8y1TPbcmZXqK4NIyMuPzMy4UlTrMwMT9+95OBgBXLffeR49/URw+vp3N9WfvnBqqes++Hjhx+/GMgxGhhQ337+NVE1ev/u06tPv15dufiem+uvX8H5Z5yvXt05deWMopj0f0IpBCf4+OWTsqqRpqqGk7vKdyY+E5dlX9lSv/7VntVb8+rZs/io/C/fGPAkFXzR+P3nDyDZGFpw7+7j6CqPR88eHjq3a9LksitnrqT7xjEwcHz4+gmPy1gIpmpZVfWTp64s37r0zbt37H8ZC7IbjLVMvay9COYfFqb/wFKIQBbTVdDWzW6DsF2tXYnN6P9JyLqkAWA0/qOd0bQCLH8YmZmwlat/gaUQIYv/MTL9YWD5x8CMWYAApVg4GX4zMvz7j27Kf47//9gYWAi4699vTsZvrIwcLKgRBjQaCAECDAAobt+WaLkKAQAAAABJRU5ErkJggg==" }
                }
            }
        }
    }
};