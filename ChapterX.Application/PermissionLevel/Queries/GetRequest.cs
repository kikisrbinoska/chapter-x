using MediatR;

namespace ChapterX.Application.PermissionLevel.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
