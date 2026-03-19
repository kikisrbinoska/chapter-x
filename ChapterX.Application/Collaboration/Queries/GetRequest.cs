using MediatR;

namespace ChapterX.Application.Collaboration.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
