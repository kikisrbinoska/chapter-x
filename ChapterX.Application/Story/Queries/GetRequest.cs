using MediatR;

namespace ChapterX.Application.Story.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
