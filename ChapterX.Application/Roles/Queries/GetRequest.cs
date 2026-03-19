using MediatR;

namespace ChapterX.Application.Roles.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
