using MediatR;

namespace ChapterX.Application.User.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
