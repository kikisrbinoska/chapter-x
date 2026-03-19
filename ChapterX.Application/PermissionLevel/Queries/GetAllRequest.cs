using MediatR;

namespace ChapterX.Application.PermissionLevel.Queries
{
    public record GetAllRequest() : IRequest<GetAllResponse>;
}
